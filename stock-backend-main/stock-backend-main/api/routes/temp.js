const mongoose = require("mongoose");
const keys = require("../../config/keys");
const Users = require("../../models/Users");
const validators = require("../../validation/validators");
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  console.log("requested", req.body);
  Users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(404).json({ email: "Email ID already exists!" });
    } else {
      const registerUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobileNo: req.body.mobileNo,
        bucket: [],
      });
      registerUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
  });
});
router.post("/login", (req, res) => {
  console.log(req.body);
  Users.findOne({ email: req.body.email }).then((user) => {
    if (!user) res.status(400).json({ email: "Email doesn't exist!" });
    else {
      res.status(200).json(user);
    }
  });
});
router.post("/bucketchange", (req, res) => {
  console.log("requested for bucketchange", req.body);

  Users.findOne({ email: req.body.email }).then((user) => {
    console.log(user)
    if (user) {
      const getuser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobileNo: req.body.mobileNo,
        bucket: req.body.finalarr,
        query: req.body.queryarr
      });
      getuser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    } else {
      res.status(404).json({ error:"error user not found" });
    }
  });
});
module.exports = router;
