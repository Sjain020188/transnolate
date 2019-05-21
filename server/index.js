const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const http = require("http");
const socketio = require("socket.io");
const db = require("./knex");
const session = require("express-session");

const app = express();
let onlineusers = {};

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

app.use(
  session({
    secret: "cats",
    saveUninitialized: false,
    resave: false
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
// app.use("/auth", auth);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  "local",
  new LocalStrategy(
    { passRequestToCallback: true },
    async (username, password, done) => {
      console.log("strategy");
      await loginAttempt();
      async function loginAttempt() {
        try {
          const user = await db("users")
            .select()
            .where({ username });
          console.log("passport", user);
          if (user.length === 0) {
            console.log("no user found");
            return done(null, false, { message: "Incorrect password." });
          } else {
            if (user[0].password === password) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  )
);

let loggedin = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to chatssapp");
});

app.get("/users/:username", async (req, res) => {
  const user = await db("users")
    .select("first_name", "last_name", "phone_number", "email", "username")
    .where({ email: req.params.username });

  res.send(user);
});

app.post("/users/review", async (req, res) => {
  const user = await db("user_review").insert(req.body);
  res.send("Added");
});

app.get("/reviews/:username", async (req, res) => {
  const user = await db("user_review")
    .select()
    .where({ username: req.params.username });
  res.send(user);
});
//socket io fro checking online users

const getUserNameByEmail = async email => {
  const user = await db("users")
    .select("first_name")
    .where({ email });
  return user.first_name;
};
let server = http.createServer(app);
let io = socketio(server);
io.on("connection", function(socket) {
  let online = Object.keys(io.engine.clients);
  io.emit("server message", JSON.stringify(online));
  socket.on("new user", function(data) {
    let name = getUserNameByEmail(data);
    socket.nickname = name;
    onlineusers[name] = "online";
    let final = [];
    for (let nickname in onlineusers) {
      if (onlineusers[nickname] === "online") {
        final.push(nickname);
      }
    }
    io.emit("users", final);
  });

  socket.on("disconnect", function(data) {
    console.log("disconecting", data);
    onlineusers[socket.nickname] = "offline";
    var online = Object.keys(io.engine.clients);
    io.emit("server message", JSON.stringify(online));
  });
});

//authentication using passport

app.get("/profile", loggedin, function(req, res, next) {
  console.log("logged in");
  res.render("profile", {
    user: req.user
  });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/signup", async (req, res) => {
  const user = await db("users")
    .select()
    .where({ username: req.body.username });

  if (user.length !== 0) {
    res.status(500).send("This username already exist");
  } else {
    const user = await db("users").insert(req.body);
    res.json("added");
  }
});

app.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: true }, err => {
      if (err) {
        res.send(err);
      }
      // const token = jwt.sign(user, "your_jwt_secret");
      --inspect;
      console.log("logged in", user);
      return res.json({ user });
    });
  })(req, res);
});

server.listen(process.env.PORT || 3000, () => console.log("we up."));
