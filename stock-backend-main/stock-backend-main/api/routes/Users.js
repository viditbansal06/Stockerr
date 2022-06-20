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
        query:[],
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
router.patch("/bucketchange", (req, res) => {
  var temp = [];
  for (var i = 0; i < req.body.finalarr.length; i++) {
    var query = "1. symbol";
    let firstKey = Object.keys(req.body.finalarr[i])[0]; // "plainKey"
    let firstValue = Object.values(req.body.finalarr[i])[0]; // "plain value"
    temp.push(firstValue);
    console.log(firstValue);
  }
  Users.updateOne(
    {
      email: req.body.email,
    },
    { $set: { bucket: temp } }
  ).then((user) => {
    // console.log(user);
  });
});

router.patch("/sharebucket", (req, res) => {
  console.log(req.body);
  var temp = [];
  for (var i = 0; i < req.body.finalarr.length; i++) {
    var query = "1. symbol";
    let firstKey = Object.keys(req.body.finalarr[i])[0]; // "plainKey"
    let firstValue = Object.values(req.body.finalarr[i])[0]; // "plain value"
    temp.push(firstValue);
    console.log(firstValue);
  }
  Users.updateOne(
    {
      email: req.body.shareemail,
    },
    { $set: { bucket: temp } }
  ).then((user) => {
    console.log("shared");
  });
});

router.patch("/querychange", (req, res) => {
  var temp = [];
  for (var i = 0; i < req.body.queryarr.length; i++) {
    temp.push(req.body.queryarr[i]);
  }
  console.log(temp);
  Users.updateOne(
    {
      email: req.body.email,
    },
    { $set: { query: temp } }
  ).then((user) => {
    // console.log(user);
  });
});

router.patch("/sharequery", (req, res) => {
  console.log(req.body);
  var temp = [];
  for (var i = 0; i < req.body.queryarr.length; i++) {
    temp.push(req.body.queryarr[i]);
  }
  console.log(temp);
  Users.updateOne(
    {
      email: req.body.shareemail,
    },
    { $set: { query: temp } }
  ).then((user) => {
    console.log("shared");
  });
});

module.exports = router;
