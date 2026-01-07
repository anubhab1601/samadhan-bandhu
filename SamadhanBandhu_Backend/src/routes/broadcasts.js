import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Broadcast message
router.post('/', authenticateToken, authorize(['central']), async (req, res) => {
  try {
    const { title, message, targetRole, targetState, priority } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const broadcastId = generateId();

    await run(
      `INSERT INTO broadcasts (id, title, message, createdBy, targetRole, targetState, priority, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [broadcastId, title, message, req.user.id, targetRole, targetState, priority || 'normal']
    );

    // Send to target users
    if (targetRole) {
      const users = await all(
        'SELECT id FROM users WHERE role = ? AND isActive = 1',
        [targetRole]
      );

      for (const user of users) {
        await run(
          `INSERT INTO notifications (id, userId, title, message, type, relatedId, relatedType, isRead, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, 0, datetime('now'))`,
          [generateId(), user.id, title, message, 'broadcast', broadcastId, 'broadcast']
        );
      }
    }

    res.status(201).json({
      message: 'Broadcast sent successfully',
      broadcastId
    });
  } catch (error) {
    console.error('Send broadcast error:', error);
    res.status(500).json({ message: 'Failed to send broadcast' });
  }
});

// Get all broadcasts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { targetRole, priority } = req.query;

    let query = 'SELECT * FROM broadcasts WHERE 1=1';
    const params = [];

    if (targetRole) {
      query += ' AND targetRole = ?';
      params.push(targetRole);
    }
    if (priority) {
      query += ' AND priority = ?';
      params.push(priority);
    }

    query += ' ORDER BY createdAt DESC';

    const broadcasts = await all(query, params);
    res.json(broadcasts);
  } catch (error) {
    console.error('Get broadcasts error:', error);
    res.status(500).json({ message: 'Failed to fetch broadcasts' });
  }
});

export default router;
