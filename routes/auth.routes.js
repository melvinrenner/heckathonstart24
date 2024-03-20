const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout", controller.signout);
  app.get("/api/test", controller.test)
  /**
  app.post("/api/auth/requestPasswordReset", controller.requestPasswordReset);
  app.post("/api/auth/resetPassword", controller.resetPassword);
  */
};