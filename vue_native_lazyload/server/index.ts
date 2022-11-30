import express from "express";
import BodyParser from "body-parser";
import { readFileSync } from "fs";
import { resolve } from "path";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));
// static files
app.use(express.static("public"));

// CORS
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/imgs", (req, res) => {
  const image_data = JSON.parse(
    readFileSync(resolve(__dirname, "./data/images.json")).toString()
  );
  res.send(image_data);
});

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
