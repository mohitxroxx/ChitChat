const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const socket=require('socket.io')
const auth = require("./routes/auth");
const msg = require("./routes/msg");
const connectDB = require('./config/db')
dotenv.config({path:'./config/.env'})
connectDB()

const app=express()
app.use(cors());
app.use(express.json());

// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = '314213410397-8irgj1u87btqb33o5j0ctqe4rjaud3h8.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5100/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//       userProfile=profile;
//       return done(null, userProfile);
//   } 
// ))
 
// app.get('/auth/google', 
//   passport.authenticate('google', { scope : ['profile', 'email'] }));
 
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function(req, res) {
//     res.redirect('/success');
//   });
app.use("/api/auth", auth)
app.use("/api/messages", msg)

const PORT = app.listen(process.env.PORT, () =>
  console.log(`SERVER UP and running at ${process.env.PORT}`)
)

const io = socket(PORT, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
})

global.onlineUsers = new Map()
io.on("connection", (socket) => {
  global.chatSocket = socket
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg)
    }
  })
}) 