import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all users
router.get('/', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const { role, state, isActive } = req.query;

    let query = 'SELECT id, email, firstName, lastName, role, department, designation, state, district, block, phone, isActive, createdAt FROM users WHERE 1=1';
    const params = [];

    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }
    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }
    if (isActive !== undefined) {
      query += ' AND isActive = ?';
      params.push(isActive === 'true' ? 1 : 0);
    }

    query += ' ORDER BY createdAt DESC';

    const users = await all(query, params);
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get single user
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await get(
      'SELECT id, email, firstName, lastName, role, department, designation, state, district, block, phone, profilePicture, isActive, createdAt FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Get users by role
router.get('/role/:role', authenticateToken, async (req, res) => {
  try {
    const users = await all(
      'SELECT id, email, firstName, lastName, role, department, state, district, block FROM users WHERE role = ? AND isActive = 1 ORDER BY firstName',
      [req.params.role]
    );

    res.json(users);
  } catch (error) {
    console.error('Get users by role error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Deactivate user
router.put('/:id/deactivate', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const user = await get('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await run('UPDATE users SET isActive = 0, updatedAt = datetime("now") WHERE id = ?', [req.params.id]);

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({ message: 'Failed to deactivate user' });
  }
});

// Activate user
router.put('/:id/activate', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const user = await get('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await run('UPDATE users SET isActive = 1, updatedAt = datetime("now") WHERE id = ?', [req.params.id]);

    res.json({ message: 'User activated successfully' });
  } catch (error) {
    console.error('Activate user error:', error);
    res.status(500).json({ message: 'Failed to activate user' });
  }
});

// Get user statistics
router.get('/stats/summary', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const stats = await get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN isActive = 1 THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN role = 'agency' THEN 1 ELSE 0 END) as agencies,
        SUM(CASE WHEN role = 'field-officer' THEN 1 ELSE 0 END) as fieldOfficers,
        SUM(CASE WHEN role = 'state' THEN 1 ELSE 0 END) as stateUsers
      FROM users
    `);

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

export default router;
