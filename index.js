

//importing a package or library
const express = require("express");
require("dotenv").config();

//importing cors for conntecting FE and BE we are using cors
const cors = require("cors");
const router = require("./routes/userRouting");

//importing db connection
require("./DB/DBconnection");


//server creation using express
const server = express();

//connecting server and fe using cors
server.use(cors());

//to convert all incoming json type data in to js
server.use(express.json());

server.use(router);

const port = 3005 || process.env.port;



server.listen(port, () => {
  console.log(`---server started at port numbers ${port}---`);
})