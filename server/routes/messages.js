const router = require('express').Router();
const Message = require('../models/Message');

// 1. SEND MESSAGE (This is working for you)
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. GET ALL MESSAGES (This was likely MISSING or Broken)
// This is what the Admin Page needs to show the Inbox.
router.get('/', async (req, res) => {
  try {
    // Find all messages and sort by newest first (-1)
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. DELETE MESSAGE (For the Trash Icon)
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Message has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;