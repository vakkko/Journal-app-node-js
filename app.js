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

const posts = [];

app.get("/", (req, res) => {
  res.render("index", { post: posts });
});

app.get("/journal", (req, res) => {
  res.render("journal");
});

app.post("/journal", (req, res) => {
  posts.push(req.body);
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("server is running!");
});
