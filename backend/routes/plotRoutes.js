const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all plots
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM plots ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new plot
router.post('/', async (req, res) => {
  const { name, location, price, size, status, project_id, image_url } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO plots (name, location, price, size, status, project_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, location, price, size, status || 'Available', project_id, image_url]
    );
    res.status(201).json({ id: result.insertId, message: 'Plot added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update plot
router.put('/:id', async (req, res) => {
  const { name, location, price, size, status, project_id, image_url, approval } = req.body;
  try {
    await db.query(
      'UPDATE plots SET name = ?, location = ?, price = ?, size = ?, status = ?, project_id = ?, image_url = ?, approval = ? WHERE id = ?',
      [name, location, price, size, status, project_id, image_url, approval, req.params.id]
    );
    res.json({ message: 'Plot updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete plot
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM plots WHERE id = ?', [req.params.id]);
    res.json({ message: 'Plot deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
