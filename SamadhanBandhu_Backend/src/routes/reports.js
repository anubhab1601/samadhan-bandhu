import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Submit report
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { projectId, reportType, period, content, fileUrl } = req.body;

    if (!reportType || !period) {
      return res.status(400).json({ message: 'Report type and period are required' });
    }

    const reportId = generateId();

    await run(
      `INSERT INTO reports (id, projectId, reportType, period, submittedBy, submissionDate, content, fileUrl, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, datetime('now'), ?, ?, 'pending', datetime('now'), datetime('now'))`,
      [reportId, projectId, reportType, period, req.user.id, content, fileUrl]
    );

    res.status(201).json({
      message: 'Report submitted successfully',
      reportId
    });
  } catch (error) {
    console.error('Submit report error:', error);
    res.status(500).json({ message: 'Failed to submit report' });
  }
});

// Get all reports
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, reportType, projectId, submittedBy } = req.query;

    let query = `SELECT r.*, u.firstName, u.lastName FROM reports r 
                 LEFT JOIN users u ON r.submittedBy = u.id WHERE 1=1`;
    const params = [];

    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }
    if (reportType) {
      query += ' AND r.reportType = ?';
      params.push(reportType);
    }
    if (projectId) {
      query += ' AND r.projectId = ?';
      params.push(projectId);
    }
    if (submittedBy) {
      query += ' AND r.submittedBy = ?';
      params.push(submittedBy);
    }

    query += ' ORDER BY r.submissionDate DESC';

    const reports = await all(query, params);
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

// Get single report
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const report = await get(
      `SELECT r.*, u.firstName, u.lastName FROM reports r 
       LEFT JOIN users u ON r.submittedBy = u.id WHERE r.id = ?`,
      [req.params.id]
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ message: 'Failed to fetch report' });
  }
});

// Approve report
router.put('/:id/approve', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const report = await get('SELECT * FROM reports WHERE id = ?', [req.params.id]);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await run(
      `UPDATE reports SET status = 'approved', approvedBy = ?, approvedDate = datetime('now'), updatedAt = datetime('now')
       WHERE id = ?`,
      [req.user.id, req.params.id]
    );

    res.json({ message: 'Report approved successfully' });
  } catch (error) {
    console.error('Approve report error:', error);
    res.status(500).json({ message: 'Failed to approve report' });
  }
});

// Reject report
router.put('/:id/reject', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const { reason } = req.body;

    const report = await get('SELECT * FROM reports WHERE id = ?', [req.params.id]);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await run(
      `UPDATE reports SET status = 'rejected', approvedBy = ?, approvedDate = datetime('now'), updatedAt = datetime('now')
       WHERE id = ?`,
      [req.user.id, req.params.id]
    );

    res.json({ message: 'Report rejected successfully' });
  } catch (error) {
    console.error('Reject report error:', error);
    res.status(500).json({ message: 'Failed to reject report' });
  }
});

// Get report statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const stats = await get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM reports
    `);

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

export default router;
