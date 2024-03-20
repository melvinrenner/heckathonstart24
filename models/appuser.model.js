const enums = require("./enums/index.js")();

module.exports = (sequelize, Sequelize) => {
    const Appuser = sequelize.define("appuser", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobil: {
        type: Sequelize.STRING
      },
      salutation: {
        type: Sequelize.ENUM,
        values: enums.salutation,
        allowNull: false 
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  
    return Appuser;
  };