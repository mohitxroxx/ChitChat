const User = require("../models/user")
const bcrypt = require("bcrypt")
const sendmail=require('../util/verify')

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({username})
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false })
    delete user.password
    return res.json({ msg:"login successful",username})
  } catch (ex) {
    next(ex)
  }
}

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck)
      return res.json({ msg: "Username already exists", status: false })
    const emailCheck = await User.findOne({ email })
    if (emailCheck)
      return res.json({ msg: "Email already exists", status: false })
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ 
      email,
      username,
      password: hashedPassword,
    })
    // console.log(req.body)
    delete user.password
    // await sendmail.sendmail(user, res)
    return res.json({ msg:"registered successfully",username})
  } catch (ex) {
    next(ex) 
  }
}
 

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "Invalid error occured!!" })
    onlineUsers.delete(req.params.id)
    return res.status(200).send()
  } catch (ex) {
    next(ex)
  }
}
