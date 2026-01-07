import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create tender
router.post('/', authenticateToken, authorize(['central', 'block', 'state']), async (req, res) => {
  try {
    const { title, description, category, estimatedBudget, publishDate, closingDate, projectId, state, district, block } = req.body;

    if (!title || !publishDate || !closingDate || !state) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const tenderId = generateId();

    await run(
      `INSERT INTO tenders (id, title, description, category, estimatedBudget, publishDate, closingDate, status, projectId, state, district, block, createdBy, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [tenderId, title, description, category, estimatedBudget, publishDate, closingDate, projectId, state, district, block, req.user.id]
    );

    res.status(201).json({
      message: 'Tender created successfully',
      tenderId
    });
  } catch (error) {
    console.error('Create tender error:', error);
    res.status(500).json({ message: 'Failed to create tender' });
  }
});

// Get all tenders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { state, status, category } = req.query;

    let query = 'SELECT * FROM tenders WHERE 1=1';
    const params = [];

    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY publishDate DESC';

    const tenders = await all(query, params);
    res.json(tenders);
  } catch (error) {
    console.error('Get tenders error:', error);
    res.status(500).json({ message: 'Failed to fetch tenders' });
  }
});

// Get single tender
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const tender = await get('SELECT * FROM tenders WHERE id = ?', [req.params.id]);

    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    const applications = await all('SELECT * FROM tender_applications WHERE tenderId = ?', [req.params.id]);

    res.json({
      tender,
      applications,
      applicationCount: applications.length
    });
  } catch (error) {
    console.error('Get tender error:', error);
    res.status(500).json({ message: 'Failed to fetch tender' });
  }
});

// Apply for tender
router.post('/:id/apply', authenticateToken, authorize(['agency']), async (req, res) => {
  try {
    const { proposedBudget, documentUrl } = req.body;

    const tender = await get('SELECT * FROM tenders WHERE id = ?', [req.params.id]);
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    // Check if already applied
    const existing = await get(
      'SELECT id FROM tender_applications WHERE tenderId = ? AND agencyId = ?',
      [req.params.id, req.user.id]
    );

    if (existing) {
      return res.status(409).json({ message: 'Already applied for this tender' });
    }

    const applicationId = generateId();
    const user = await get('SELECT firstName, lastName FROM users WHERE id = ?', [req.user.id]);
    const agencyName = `${user.firstName} ${user.lastName}`;

    await run(
      `INSERT INTO tender_applications (id, tenderId, agencyId, agencyName, proposedBudget, documentUrl, status, submissionDate, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', datetime('now'), datetime('now'), datetime('now'))`,
      [applicationId, req.params.id, req.user.id, agencyName, proposedBudget, documentUrl]
    );

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId
    });
  } catch (error) {
    console.error('Apply tender error:', error);
    res.status(500).json({ message: 'Failed to apply for tender' });
  }
});

// Update tender status
router.put('/:id/status', authenticateToken, authorize(['central', 'block', 'state']), async (req, res) => {
  try {
    const { status } = req.body;

    const tender = await get('SELECT * FROM tenders WHERE id = ?', [req.params.id]);
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    await run('UPDATE tenders SET status = ?, updatedAt = datetime("now") WHERE id = ?', [status, req.params.id]);

    res.json({ message: 'Tender status updated successfully' });
  } catch (error) {
    console.error('Update tender error:', error);
    res.status(500).json({ message: 'Failed to update tender' });
  }
});

// Evaluate application
router.put('/application/:applicationId/evaluate', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const { score, status } = req.body;

    const application = await get('SELECT * FROM tender_applications WHERE id = ?', [req.params.applicationId]);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await run(
      `UPDATE tender_applications SET status = ?, evaluationScore = ?, evaluatedBy = ?, evaluationDate = datetime('now'), updatedAt = datetime('now')
       WHERE id = ?`,
      [status, score, req.user.id, req.params.applicationId]
    );

    res.json({ message: 'Application evaluated successfully' });
  } catch (error) {
    console.error('Evaluate application error:', error);
    res.status(500).json({ message: 'Failed to evaluate application' });
  }
});

export default router;
