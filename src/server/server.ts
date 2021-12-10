import express from "express";
import cors from "cors";
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "./schemas/user.schema.js";

const __dirname = path.resolve();
console.log(__dirname);
const port = 3000;
const saltRounds = 10;

const app = express();

const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

mongoose
  .connect("mongodb://localhost:27017/mongooseTutorial")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));


app.use(cors());
app.use(express.json())


app.get("/api/users", function (req, res) {
  res.json({message: "new new.. add api before restful"});
});

app.post('/api/sign-up', async function(req, res) {
  const {username, password} = req.body;
  console.log("from server.ts>> ",username, password)

  const found = await UserModel.findOne({username}).lean()
  if (found){
    res.json({message: "Username is taken. Please insert a unique username."})
  } else {
    // WITHOUT HOOKS
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hash = await bcrypt.hash(password, salt);

    // const user = new UserModel({
    //   username,
    //   password: hash,
    // });

    // // HOOK EXAMPLE
    const user = new UserModel({
      username,
      password,
    })

    user.save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(501);
      console.log(err);
      res.json({ errors: err });
    });
  }
})

app.get("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});

app.listen(port, function() {
  console.log(`running on http://localhost:${port}`)
}) 


