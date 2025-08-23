import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

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

app.post("/delete-post", (req, res) => {
  const postId = Number(req.body.id);
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === postId) {
      posts.splice(i, 1);
      break;
    }
  }
});

app.listen(5000, () => {
  console.log("server is running!");
});
