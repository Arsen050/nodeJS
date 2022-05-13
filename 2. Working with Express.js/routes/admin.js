const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res, next) => {
    if (!req.body.login) {
        res.redirect("/login");
    } else {
        res.send(`<h1>Welcome ${req.body.login} !</h1>`);
    }
});

router.get("/login", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
});

router.post("/home", (req, res, next) => {
    res.send(`<h1>Welcome ${req.body.login} !</h1>`);
});

module.exports = router;