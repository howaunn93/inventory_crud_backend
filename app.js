const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const inventory = require("./src/routes/product");
const supplier = require("./src/routes/supplier");

app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("Hello World");
});

app.use("/api",inventory);
app.use("/api",supplier);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});