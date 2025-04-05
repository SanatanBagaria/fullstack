// src/routes/gameRoutes.js
const express = require('express');
const { getPuzzle, validatePuzzleSolution, recordGame, getGameHistory } = require('../controllers/gameController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/puzzle', getPuzzle);
router.post('/validate', validatePuzzleSolution);

// Protected routes - require authentication
router.post('/', protect, recordGame);
router.get('/history', protect, getGameHistory);

module.exports = router;
