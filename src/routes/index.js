const express = require("express");
const router = express.Router();
const { requirePageAuth } = require("../middlewares/page-auth");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Genshin novel reader" });
});

router.post("/", function (req, res, next) {
  res.render("index", { title: "Genshin novel reader" });
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("novelToken", { path: "/" });
  res.clearCookie("username", { path: "/" });
  res.render("logout");
});

router.get("/novel", requirePageAuth(), function (req, res, next) {
  res.render("novel");
});

router.get("/admin", requirePageAuth({ adminOnly: true }), function (req, res) {
  res.render("admin");
});

module.exports = router;
