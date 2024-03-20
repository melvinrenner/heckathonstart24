const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.appuser = require("./appuser.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.appuser, {
  through: "appuser_roles",
  foreignKey: "roleId",
  otherKey: "appuserId"
});
db.appuser.belongsToMany(db.role, {
  through: "appuser_roles",
  foreignKey: "appuserId",
  otherKey: "roleId"
});



db.ROLES = ["admin", "coursemanager", "buchhalter", "courseleiter", "reporting", "masterdata", "kabinenhelfer"];

module.exports = db;