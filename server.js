const express = require('express');
const app = express();                                                        
const port = 3000;
const cors = require("cors");
const fs = require('fs');
const fileUpload  = require('express-fileupload');
const cookieParser = require('cookie-parser');
const generalConfig = require("./config/general.config");
const azure_config = require("./config/azure.config");
/**const AWS = require('azure-sdk');
const azure_config = require("./config/azure.config");
const s3Service = require("./services/azure/s3");
const s3 = new AWS.S3({
  accessKeyId: azure_config.id,
  secretAccessKey: azure_config.secret,
});
 */


const { BlobServiceClient } = require("@azure/storage-blob");
const blobServiceClient = new BlobServiceClient(
  azure_config.baseUrl,
  azure_config.key
);



var corsOptions = {
  origin: [generalConfig.clientURL, generalConfig.clientURLhttps, generalConfig.localClientURL],
  credentials: true
};


app.use(cookieParser());
app.use(fileUpload());
app.use(cors(corsOptions));
//app.options('*', cors(corsOptions));

var path = require('path');
global.appRoot = path.resolve(__dirname);
//app.use(express.static(path.join(__dirname, '/')));

app.use(express.json()); 
app.use(express.urlencoded()); 


const schema = " ";   

require('./routes/auth.routes')(app);
  
var bcrypt = require("bcryptjs");


const db = require("./models"); 



// set port, listen for requests
const PORT =  8080; //8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


