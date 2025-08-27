import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import delePost from "./utils/postUtils.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const posts = [];

app.get("/", (req, res) => {
  res.render("index", { post: posts });
});

app.get("/journal", (req, res) => {
  res.render("journal");
});

app.post("/journal", (req, res) => {
  const { title, post } = req.body;
  posts.push({ title, post, id: Date.now() });
  res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
  const postid = Number(req.params.id);
  const post = posts.find((pst) => pst.id === postid);
  res.render("post", { post });
});

app.delete("/delete-post", (req, res) => {
  const postId = Number(req.body.id);
  delePost(posts, postId);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("server is running!");
});
