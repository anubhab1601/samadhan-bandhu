import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Schedule inspection
router.post('/', authenticateToken, authorize(['state', 'central']), async (req, res) => {
  try {
    const { projectId, inspectorId, scheduledDate, location } = req.body;

    if (!projectId || !inspectorId || !scheduledDate) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const inspectionId = generateId();

    await run(
      `INSERT INTO inspections (id, projectId, inspectorId, status, scheduledDate, location, createdAt, updatedAt)
       VALUES (?, ?, ?, 'scheduled', ?, ?, datetime('now'), datetime('now'))`,
      [inspectionId, projectId, inspectorId, scheduledDate, location]
    );

    res.status(201).json({
      message: 'Inspection scheduled successfully',
      inspectionId
    });
  } catch (error) {
    console.error('Schedule inspection error:', error);
    res.status(500).json({ message: 'Failed to schedule inspection' });
  }
});

// Get all inspections
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, projectId, inspectorId } = req.query;

    let query = 'SELECT * FROM inspections WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (projectId) {
      query += ' AND projectId = ?';
      params.push(projectId);
    }
    if (inspectorId) {
      query += ' AND inspectorId = ?';
      params.push(inspectorId);
    }

    query += ' ORDER BY scheduledDate DESC';

    const inspections = await all(query, params);
    res.json(inspections);
  } catch (error) {
    console.error('Get inspections error:', error);
    res.status(500).json({ message: 'Failed to fetch inspections' });
  }
});

// Get single inspection
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const inspection = await get('SELECT * FROM inspections WHERE id = ?', [req.params.id]);

    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    const project = await get('SELECT * FROM projects WHERE id = ?', [inspection.projectId]);
    const inspector = await get('SELECT * FROM users WHERE id = ?', [inspection.inspectorId]);

    res.json({
      inspection,
      project,
      inspector
    });
  } catch (error) {
    console.error('Get inspection error:', error);
    res.status(500).json({ message: 'Failed to fetch inspection' });
  }
});

// Submit inspection report
router.put('/:id/submit', authenticateToken, authorize(['field-officer']), async (req, res) => {
  try {
    const { completionPercentage, findings, recommendations, photoUrls, gpsCoordinates, reportUrl } = req.body;

    const inspection = await get('SELECT * FROM inspections WHERE id = ?', [req.params.id]);
    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    await run(
      `UPDATE inspections SET status = 'completed', completionPercentage = ?, findings = ?, recommendations = ?, 
       photoUrls = ?, gpsCoordinates = ?, reportUrl = ?, actualDate = datetime('now'), updatedAt = datetime('now')
       WHERE id = ?`,
      [completionPercentage, findings, recommendations, photoUrls, gpsCoordinates, reportUrl, req.params.id]
    );

    // Update project completion percentage
    const allInspections = await all('SELECT completionPercentage FROM inspections WHERE projectId = ? AND status = "completed"', [inspection.projectId]);
    if (allInspections.length > 0) {
      const avgCompletion = allInspections.reduce((sum, i) => sum + (i.completionPercentage || 0), 0) / allInspections.length;
      await run(
        'UPDATE projects SET completionPercentage = ?, updatedAt = datetime("now") WHERE id = ?',
        [Math.round(avgCompletion), inspection.projectId]
      );
    }

    res.json({ message: 'Inspection report submitted successfully' });
  } catch (error) {
    console.error('Submit report error:', error);
    res.status(500).json({ message: 'Failed to submit report' });
  }
});

// Get inspection statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const stats = await get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        AVG(completionPercentage) as avgCompletion
      FROM inspections
    `);

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

export default router;
