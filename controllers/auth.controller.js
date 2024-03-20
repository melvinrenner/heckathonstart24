const db = require("../models");
const config = require("../config/auth.config");
const generalConfig = require("../config/general.config");

//var MailService = require('../services/mail.services') 
//var PasswordResetTemlate = require('../services/templates/resetPassword.template') 

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  db.kunde.findOne({
    where: {
      email: req.body.email.toLowerCase()
    }
    //,attributes: { exclude: ['password'] }
  })
    .then(kunde => {
      if (!kunde) {
        return res.status(404).send({ message: "Kunde konnte nicht gefunden werden." });
      }
      if (kunde.deleted) {
        return res.status(404).send({ message: "Kunde konnte nicht gefunden werden." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        kunde.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: kunde.id }, config.secret, {
        expiresIn: 24*60*60*1000 // 24 hours
      });

      var authorities = [];


      res.status(200)
      .setHeader("x-content-type-options", "nosniff")
      .setHeader("access-control-expose-headers", "Set-Cookie")
      .cookie('ersieesTokenKunde', token, {
        httpOnly: true,
        maxAge: 8*60*60*1000, // 24 hours          
        secure: true,
        sameSite: true,
        path: '/'
      })
      .cookie('ersieesUserInfoKunde', JSON.stringify({
        id: kunde.id,
        name: kunde.name,
        vorname: kunde.vorname,
        email: kunde.email,
        festnetz: kunde.festnetz,
        mobil: kunde.mobil,
        strasseNr: kunde.strasseNr,
        plz: kunde.plz,
        ort: kunde.ort
      }), {
        httpOnly: false,
        maxAge: 24*60*60*1000, // 24 hours          
        secure: true,
        sameSite: true,
        path: '/'
      })
      .send({
        id: kunde.id,
        name: kunde.name,
        vorname: kunde.vorname
        //accessToken: token
      });
        
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
    //console.log(req.cookies);
    res.status(200)
    res.clearCookie('ersieesTokenKunde') 
    res.clearCookie('ersieesUserInfoKunde')    
    res.send({message: "Successfully logged out!"})
}

exports.test = (req, res) => {
  //console.log(req.cookies);
  res.status(200)   
  res.send({message: "Successfully test"})
}

/** 
exports.requestPasswordReset = (req, res) => {
  db.kunde.findOne({
    where: {
      email: req.body.email.toLowerCase()
    }
  })
  .then(kunde => {
    if (!kunde) {
      return res.status(404).send({ message: "Kunde konnte nicht gefunden werden." });
    }else{
      if (kunde.deleted) {
        return res.status(404).send({ message: "Kunde konnte nicht gefunden werden." });
      }
      var token = jwt.sign({ id: kunde.id }, config.secret, {
        expiresIn: 3600 // 1 hour  
      });
      var subject = "Passwort neu setzen - ER sie & es"
      var url = `${generalConfig.clientURL}/passwordReset/${token}`
      var template = 'passwordreset' ;
      var context = {
        url: url
      }
        //send email with request token
      MailService.sendMail([kunde.email], [], [], subject, template, context, []);
      res.status(200).send({
        mailsend: true
      });
    }  
    })
    .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.resetPassword = (req, res) => {
  var decoded = jwt.verify(req.body.token, config.secret);
  db.kunde.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(kunde => {
      if (!kunde) {
        return res.status(404).send({ message: "Kunde konnte nicht gefunden werden." });
      }else{
        if (kunde.deleted) {
          return res.status(404).send({ message: "Kunde konnte nicht gefunden werden." });
        }
        kunde.password = bcrypt.hashSync(req.body.password, 8)
        kunde.save()
        res.status(200).send({
          passwordSet: true
        });
      }  
     })
     .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
*/