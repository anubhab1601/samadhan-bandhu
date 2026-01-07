import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get notifications for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { isRead } = req.query;

    let query = 'SELECT * FROM notifications WHERE userId = ?';
    const params = [req.user.id];

    if (isRead !== undefined) {
      query += ' AND isRead = ?';
      params.push(isRead === 'true' ? 1 : 0);
    }

    query += ' ORDER BY createdAt DESC';

    const notifications = await all(query, params);
    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// Get unread count
router.get('/unread/count', authenticateToken, async (req, res) => {
  try {
    const result = await get(
      'SELECT COUNT(*) as count FROM notifications WHERE userId = ? AND isRead = 0',
      [req.user.id]
    );

    res.json({ unreadCount: result.count || 0 });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Failed to fetch unread count' });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const notification = await get('SELECT * FROM notifications WHERE id = ?', [req.params.id]);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await run('UPDATE notifications SET isRead = 1 WHERE id = ?', [req.params.id]);

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Failed to update notification' });
  }
});

// Mark all as read
router.put('/read/all', authenticateToken, async (req, res) => {
  try {
    await run('UPDATE notifications SET isRead = 1 WHERE userId = ? AND isRead = 0', [req.user.id]);

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(500).json({ message: 'Failed to update notifications' });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const notification = await get('SELECT * FROM notifications WHERE id = ?', [req.params.id]);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await run('DELETE FROM notifications WHERE id = ?', [req.params.id]);

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

// Send notification (internal)
export const sendNotification = async (userId, title, message, type, relatedId, relatedType) => {
  try {
    const notificationId = generateId();
    await run(
      `INSERT INTO notifications (id, userId, title, message, type, relatedId, relatedType, isRead, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, datetime('now'))`,
      [notificationId, userId, title, message, type, relatedId, relatedType]
    );

    return notificationId;
  } catch (error) {
    console.error('Send notification error:', error);
  }
};

export default router;
