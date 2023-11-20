const Messages = require("../models/msg")

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 })

    const curr_msg = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }
    })
    res.json(curr_msg)
  } catch (ex) {
    next(ex)
  }
}

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    })

    if (data)
    return res.json({ msg: "Message sent" })
    else return res.json({ msg: "Failed to send the msg" })
  } catch (ex) {
    next(ex)
  }
}

