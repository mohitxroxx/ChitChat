const express=require('express')
const router=express.Router()

const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/user");


router.post("/login", login);
router.post("/register", register);
router.get("/logout/:id", logOut);

module.exports = router;
