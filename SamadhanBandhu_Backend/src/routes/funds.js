import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Release funds
router.post('/release', authenticateToken, authorize(['central', 'state', 'block']), async (req, res) => {
  try {
    const { toLevel, amount, purposeType, projectId, releaseDate } = req.body;

    if (!toLevel || !amount || !releaseDate) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const fundId = generateId();

    await run(
      `INSERT INTO funds (id, fromLevel, toLevel, amount, purposeType, releaseDate, status, releasedBy, releasedDate, projectId, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, 'released', ?, datetime('now'), ?, datetime('now'), datetime('now'))`,
      [fundId, req.user.role, toLevel, amount, purposeType, releaseDate, req.user.id, projectId]
    );

    // Update project allocated funds
    if (projectId) {
      await run(
        'UPDATE projects SET allocatedFunds = allocatedFunds + ?, updatedAt = datetime("now") WHERE id = ?',
        [amount, projectId]
      );
    }

    res.status(201).json({
      message: 'Funds released successfully',
      fundId
    });
  } catch (error) {
    console.error('Release funds error:', error);
    res.status(500).json({ message: 'Failed to release funds' });
  }
});

// Get all funds
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, toLevel, projectId } = req.query;

    let query = 'SELECT * FROM funds WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (toLevel) {
      query += ' AND toLevel = ?';
      params.push(toLevel);
    }
    if (projectId) {
      query += ' AND projectId = ?';
      params.push(projectId);
    }

    query += ' ORDER BY releaseDate DESC';

    const funds = await all(query, params);
    res.json(funds);
  } catch (error) {
    console.error('Get funds error:', error);
    res.status(500).json({ message: 'Failed to fetch funds' });
  }
});

// Get fund summary by level
router.get('/summary/level', authenticateToken, async (req, res) => {
  try {
    const summary = await all(`
      SELECT toLevel, SUM(amount) as totalAmount, COUNT(*) as count, status
      FROM funds
      GROUP BY toLevel, status
      ORDER BY toLevel
    `);

    res.json(summary);
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
});

// Get project fund allocation
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const allocations = await all(
      `SELECT * FROM funds WHERE projectId = ? ORDER BY releaseDate DESC`,
      [req.params.projectId]
    );

    const totalAllocated = allocations.reduce((sum, f) => sum + (f.amount || 0), 0);
    const totalReleased = allocations
      .filter(f => f.status === 'released')
      .reduce((sum, f) => sum + (f.amount || 0), 0);

    res.json({
      allocations,
      summary: {
        totalAllocated,
        totalReleased,
        pending: totalAllocated - totalReleased
      }
    });
  } catch (error) {
    console.error('Get project allocations error:', error);
    res.status(500).json({ message: 'Failed to fetch allocations' });
  }
});

// Approve fund release
router.put('/:fundId/approve', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const fund = await get('SELECT * FROM funds WHERE id = ?', [req.params.fundId]);
    if (!fund) {
      return res.status(404).json({ message: 'Fund record not found' });
    }

    await run(
      `UPDATE funds SET status = 'approved', approvedBy = ?, approvedDate = datetime('now'), updatedAt = datetime('now')
       WHERE id = ?`,
      [req.user.id, req.params.fundId]
    );

    res.json({ message: 'Fund approval successful' });
  } catch (error) {
    console.error('Approve fund error:', error);
    res.status(500).json({ message: 'Failed to approve fund' });
  }
});

export default router;
