import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId, sanitizeUser } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create project
router.post('/', authenticateToken, authorize(['central']), async (req, res) => {
  try {
    const { title, description, state, district, block, village, category, budgetAmount, startDate, endDate, latitude, longitude } = req.body;

    if (!title || !state) {
      return res.status(400).json({ message: 'Title and state are required' });
    }

    const projectId = generateId();

    await run(
      `INSERT INTO projects (id, title, description, state, district, block, village, category, budgetAmount, status, startDate, endDate, latitude, longitude, createdBy, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'planning', ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [projectId, title, description, state, district, block, village, category, budgetAmount, startDate, endDate, latitude, longitude, req.user.id]
    );

    res.status(201).json({
      message: 'Project created successfully',
      projectId
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

// Get all projects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { state, status, category } = req.query;

    let query = 'SELECT * FROM projects WHERE 1=1';
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

    query += ' ORDER BY createdAt DESC';

    const projects = await all(query, params);
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

// Get single project
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await get('SELECT * FROM projects WHERE id = ?', [req.params.id]);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
});

// Update project
router.put('/:id', authenticateToken, authorize(['central']), async (req, res) => {
  try {
    const { title, description, status, completionPercentage, budgetAmount } = req.body;

    const project = await get('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await run(
      `UPDATE projects SET title = ?, description = ?, status = ?, completionPercentage = ?, budgetAmount = ?, updatedAt = datetime('now')
       WHERE id = ?`,
      [title || project.title, description || project.description, status || project.status, completionPercentage || project.completionPercentage, budgetAmount || project.budgetAmount, req.params.id]
    );

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
});

// Get project statistics
router.get('/:id/stats', authenticateToken, async (req, res) => {
  try {
    const project = await get('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const inspections = await all('SELECT COUNT(*) as count FROM inspections WHERE projectId = ?', [req.params.id]);
    const tenders = await all('SELECT COUNT(*) as count FROM tenders WHERE projectId = ?', [req.params.id]);
    const payments = await all('SELECT SUM(amount) as total FROM payments WHERE projectId = ?', [req.params.id]);

    res.json({
      project,
      stats: {
        inspections: inspections[0]?.count || 0,
        tenders: tenders[0]?.count || 0,
        totalPayments: payments[0]?.total || 0,
        completionPercentage: project.completionPercentage || 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

export default router;
