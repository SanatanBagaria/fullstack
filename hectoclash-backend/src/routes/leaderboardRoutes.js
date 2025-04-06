const express = require('express');
const { getLeaderboard, getUserRank } = require('../controllers/leaderboardController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getLeaderboard);
router.get('/rank', protect, getUserRank);

module.exports = router;
