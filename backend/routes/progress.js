const express = require('express');
const { updateProgress, getProgress } = require('../controllers/progressController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/update', authMiddleware, updateProgress);
router.get('/', authMiddleware, async (req, res) => {
    try {
      const progress = await Progress.findOne({ user: req.user.id });
  
      if (!progress) {
        return res.status(404).json({ message: 'No progress data found' });
      }
  
      res.json({
        hardSkills: {
          currentLevel: progress.hardSkills.currentLevel,
          totalProgress: progress.hardSkills.totalProgress,
          completedModules: progress.hardSkills.completedModules,
        },
        softSkills: {
          currentLevel: progress.softSkills.currentLevel,
          totalProgress: progress.softSkills.totalProgress,
          completedModules: progress.softSkills.completedModules,
        },
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch progress data' });
    }
  });
  
  module.exports = router;