const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  score: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  badges: {
    type: [String],
    default: []
  },
  totalGamesPlayed: {
    type: Number,
    default: 0
  },
  bestScore: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    type: Map,
    of: String
  }
}, { timestamps: true });

// Encrypt password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update stats after a game
userSchema.methods.updateStats = async function(gameResult) {
  this.totalGamesPlayed += 1;
  this.score += gameResult.score;
  this.wins += gameResult.won ? 1 : 0;
  this.losses += gameResult.won ? 0 : 1;
  if (gameResult.score > this.bestScore) {
    this.bestScore = gameResult.score;
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
