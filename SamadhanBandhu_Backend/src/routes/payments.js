import express from 'express';
import { run, get, all } from '../database/init.js';
import { generateId } from '../utils/helpers.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create payment
router.post('/', authenticateToken, authorize(['central', 'block']), async (req, res) => {
  try {
    const { projectId, agencyId, amount, paymentType, invoiceNumber, paymentDate } = req.body;

    if (!projectId || !agencyId || !amount) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const paymentId = generateId();

    await run(
      `INSERT INTO payments (id, projectId, agencyId, amount, paymentType, status, invoiceNumber, paymentDate, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, datetime('now'), datetime('now'))`,
      [paymentId, projectId, agencyId, amount, paymentType, invoiceNumber, paymentDate]
    );

    res.status(201).json({
      message: 'Payment record created successfully',
      paymentId
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: 'Failed to create payment record' });
  }
});

// Get all payments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, projectId, agencyId } = req.query;

    let query = 'SELECT * FROM payments WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (projectId) {
      query += ' AND projectId = ?';
      params.push(projectId);
    }
    if (agencyId) {
      query += ' AND agencyId = ?';
      params.push(agencyId);
    }

    query += ' ORDER BY createdAt DESC';

    const payments = await all(query, params);
    res.json(payments);
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
});

// Get single payment
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const payment = await get('SELECT * FROM payments WHERE id = ?', [req.params.id]);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const project = await get('SELECT * FROM projects WHERE id = ?', [payment.projectId]);
    const agency = await get('SELECT * FROM users WHERE id = ?', [payment.agencyId]);

    res.json({
      payment,
      project,
      agency
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ message: 'Failed to fetch payment' });
  }
});

// Approve payment
router.put('/:id/approve', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const { transactionId } = req.body;

    const payment = await get('SELECT * FROM payments WHERE id = ?', [req.params.id]);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await run(
      `UPDATE payments SET status = 'approved', approvedBy = ?, approvedDate = datetime('now'), transactionId = ?, updatedAt = datetime('now')
       WHERE id = ?`,
      [req.user.id, transactionId, req.params.id]
    );

    // Update project released funds
    await run(
      'UPDATE projects SET releasedFunds = releasedFunds + ?, updatedAt = datetime("now") WHERE id = ?',
      [payment.amount, payment.projectId]
    );

    res.json({ message: 'Payment approved successfully' });
  } catch (error) {
    console.error('Approve payment error:', error);
    res.status(500).json({ message: 'Failed to approve payment' });
  }
});

// Reject payment
router.put('/:id/reject', authenticateToken, authorize(['central', 'state']), async (req, res) => {
  try {
    const { reason } = req.body;

    await run(
      `UPDATE payments SET status = 'rejected', approvedBy = ?, approvedDate = datetime('now'), updatedAt = datetime('now')
       WHERE id = ?`,
      [req.user.id, req.params.id]
    );

    res.json({ message: 'Payment rejected successfully' });
  } catch (error) {
    console.error('Reject payment error:', error);
    res.status(500).json({ message: 'Failed to reject payment' });
  }
});

// Get payment summary
router.get('/summary/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await get(`
      SELECT 
        SUM(CASE WHEN status = 'approved' THEN amount ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'rejected' THEN amount ELSE 0 END) as rejected,
        COUNT(*) as total
      FROM payments
    `);

    res.json(stats);
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
});

export default router;
