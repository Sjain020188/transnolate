const express = require("express");
const db = require("./knex.js");
const router = express.Router();

module.exports = function(passport) {
  router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/profile"
    }),
    (req, res) => {
      res.send("logged in");
    }
  );

  return router;
};
