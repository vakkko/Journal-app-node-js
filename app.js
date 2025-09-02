import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import delePost from "./utils/postUtils.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Journal from "./model/model.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.API_URL)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  const data = await Journal.find();
  res.render("index", { post: data });
});

app.get("/journal", (req, res) => {
  res.render("journal");
});

app.post("/journal", async (req, res) => {
  const { title, post } = req.body;
  try {
    if (
      !title ||
      !post ||
      title.trim().length === 0 ||
      post.trim().length === 0
    ) {
      return res.status(400).send("Title and post are required.");
    } else {
      const newJournal = new Journal({
        title: title,
        post: post,
      });
      await newJournal.save();
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
  }
});

app.get("/posts/:id", async (req, res) => {
  const data = await Journal.find();
  const postid = req.params.id;
  const post = data.find((pst) => pst.id === postid);
  res.render("post", { post });
});

app.delete("/delete-post", (req, res) => {
  const postId = Number(req.body.id);
  delePost(posts, postId);
  res.json({ success: true });
});

app.listen(process.env.PORT, () => {
  console.log("server is running!");
});
