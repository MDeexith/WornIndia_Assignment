const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const jwt = require('jsonwebtoken');

const secret_key = 'secret';

// Middleware to verify the admin API key
const adminAuth = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (apiKey !== 'iamadmin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};

// Middleware to protect routes for logged-in users
const userAuth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, secret_key);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Admin route to add new train
router.post('/add', adminAuth, async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    await Train.addTrain(name, source, destination, totalSeats);
    res.status(201).json({ message: 'Train added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add train' });
  }
});

// Route to get available trains
router.get('/availability', async (req, res) => {
  const { source, destination } = req.body;
  try {
    const trains = await Train.getAvailableTrains(source, destination);
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get train availability' });
  }
});

// Route to book a seat
router.post('/book', userAuth, async (req, res) => {
  const { trainId } = req.body;
  try {
    const success = await Train.bookSeat(trainId, req.userId);
    if (success) {
      res.status(200).json({ message: 'Seat booked successfully' });
    } else {
      res.status(400).json({ error: 'No seats available' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

router.get('/booking-details', userAuth, async (req, res) => {
    const { trainId } = req.body;
    const userId = req.userId; // Retrieved from the userAuth middleware
  
    try {
      const bookingDetails = await Train.getBookingDetails(userId, trainId);
    //   console.log(bookingDetails);
      if (!bookingDetails) {
        return res.status(404).json({ error: 'No booking found' });
      }
  
      res.status(200).json(bookingDetails);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get booking details' });
    }
  });

module.exports = router;
