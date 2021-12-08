import express from "express";
import cors from "cors";
import path from 'path';
import mongoose from 'mongoose';

const __dirname = path.resolve();
console.log(__dirname);
const port = 3000;

const app = express();

const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cors());
app.use(express.static("public"));


app.get("api/users", function (req, res) {
  res.json({message: "new new.. add api before restful"});
});

app.get("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});

app.listen(port, function() {
  console.log(`running on http://localhost:${port}`)
}) 


