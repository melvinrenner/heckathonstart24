const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Appuser = db.appuser;
const User = db.user;
verifyToken = (req, res, next) => {
  //let token = req.cookies["x-access-token"];
  let token = req.cookies["authToken"];
  //console.log(req.cookies);
  if (!token) {
    return res
    .status(403)
    .clearCookie('authToken')
    .clearCookie('userInfoToken')  
    .send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
      .status(401)
      .clearCookie('authToken')
      .clearCookie('userInfoToken')  
      .send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};





const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;