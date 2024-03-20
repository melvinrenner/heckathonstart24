const db = require("../models");
const config = require("../config/auth.config");
const generalConfig = require("../config/general.config");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Agb = db.agb;

  

  exports.getAgbLatest = async (t) => {
    const today = new Date()         
    const bg = await Agb.findOne({          
        where: {
            version: {[Op.lte]: today}
        },
        order: [
          ['version', 'DESC']
        ]
    });
    return bg
  };  