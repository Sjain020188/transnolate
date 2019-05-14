const express = require("express");
const path = require("path");
const db = require("./knex");
const postgres = require("../knexfile");
const http = require("http");
const socketio = require("socket.io");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Pool, Client } = require("pg");
const user = process.env.USER || "postgres";
const pool = new Pool({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${user}@127.0.0.1:5432/authentication`,
  searchPath: "public"
});

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

var server = http.Server(app);
var websocket = socketio(server);

websocket.on("connection", socket => {
  console.log("A client just joined on", socket.id);
});

// app.get("/", (req, res) => res.render("index"));

// app.post("/register", (req, res, next) => {
//   return authHelpers
//     .createUser(req, res)
//     .then(response => {
//       passportSettings.authenticate("local", (err, user, info) => {
//         if (user) {
//           handleResponse(res, 200, "success");
//         }
//       })(req, res, next);
//     })
//     .catch(err => {
//       handleResponse(res, 500, "error");
//     });
// });

app.post("/users", async (req, res) => {
  try {
    const user = await db("users").insert(req.body);
    console.log(req.body);
    res.json("User added successfully");
  } catch (err) {
    console.log(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local", function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("login API call");
    res.json("User logged in successfully");
  })
);

app.get("/success", (req, res) => {
  console.log("SUCCESS");
  res.json("SUCCESS");
});

app.get("/failure", (req, res) => {
  console.log("FAILURE");
  res.json("FAILURE");
});
module.exports = app;
