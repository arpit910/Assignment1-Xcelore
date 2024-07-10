const express = require("express");
const router = express.Router();
const Message = require("../model/post.model.js");

const { User, validate } = require("../model/user.model.js");
const Text = require("../model/post.model.js");

router.post("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { title, description, image } = req.body;
  const { id } = req.params;

  try {
    const text = new Text({ title, description, image, user: userId });

    await text.save();

    await User.findByIdAndUpdate(userId, { $push: { text: text._id } });
    res.json({ message: "Text added successfully", text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function getMessagesByUserId(userId) {
  try {
    const messages = await Message.find({ user: userId });
    return messages;
  } catch (error) {
    throw error;
  }
}

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const messages = await getMessagesByUserId(userId);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:textId", async (req, res) => {
  const textId = req.params.textId;
  const { description } = req.body;

  try {
    // Update the text
    const updatedText = await Text.findByIdAndUpdate(
      textId,
      { description },
      { new: true }
    );

    if (!updatedText) {
      return res.status(404).json({ error: "Text not found" });
    }

    res.json({ message: "Text updated successfully", updatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:textId", async (req, res) => {
  const textId = req.params.textId;

  try {
    const deletedText = await Text.findOneAndDelete({ _id: textId });

    if (!deletedText) {
      return res.status(404).json({ error: "Text not found" });
    }

    await User.findByIdAndUpdate(deletedText.user, { $pull: { text: textId } });

    res.json({ message: "Text deleted successfully", deletedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
