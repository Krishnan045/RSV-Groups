const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get approved sold properties (Public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sold_properties WHERE status = "approved" ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sold properties (Admin)
router.get('/all', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sold_properties ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new sold property
router.post('/', async (req, res) => {
  const { title, location, sqft, price, type, represented, customer_name, status, image_url } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO sold_properties (title, location, sqft, price, type, represented, customer_name, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, location, sqft, price, type || 'land', represented, customer_name, status || 'approved', image_url]
    );
    res.status(201).json({ id: result.insertId, message: 'Sold property record added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update sold property (status/approval)
router.put('/:id', async (req, res) => {
  const { status, title, location, sqft, price, type, represented, customer_name } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE sold_properties SET status = ?, title = ?, location = ?, sqft = ?, price = ?, type = ?, represented = ?, customer_name = ? WHERE id = ?',
      [status, title, location, sqft, price, type, represented, customer_name, req.params.id]
    );
    res.json({ message: 'Sold property updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete sold property
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM sold_properties WHERE id = ?', [req.params.id]);
    res.json({ message: 'Sold property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
