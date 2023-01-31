// import express from "express";
const express = require('express')
const users = require('../controllers/userController.js')
// import {users} from "../controllers/userController.js";

let router = express.Router();


let initRoutes = (app) => {
  // router.get("/", users.index);
  router.get("/login", users.login);
  // router.get("/register", users.register);

  return app.use("/", router);
};

module.exports = initRoutes;
