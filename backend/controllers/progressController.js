const Progress = require('../models/Progress');

exports.updateProgress = async (req, res) => {
  try {
    const { hardSkills, softSkills } = req.body;
    
    let progress = await Progress.findOne({ user: req.user._id });
    
    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        hardSkills,
        softSkills
      });
    } else {
      progress.hardSkills = hardSkills;
      progress.softSkills = softSkills;
    }
    
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Progress update failed' });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ 
      user: req.user._id 
    });
    
    if (!progress) {
      return res.status(404).json({ 
        message: 'No progress found' 
      });
    }
    
    res.json({
      hardSkills: progress.hardSkills,
      softSkills: progress.softSkills
    });
  } catch (error) {
    res.status(500).json({ message: 'Fetch progress failed' });
  }
};