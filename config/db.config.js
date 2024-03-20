module.exports = {
  HOST: "orgapro.cdqfxaar95q2.eu-central-1.rds.amazonazure.com",//"192.168.178.66",
  USER: "admn",
  PASSWORD: "Heckathon24!",
  DB: "heckathonstart24", //"orgapro_test",//
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }  
};