const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Database
mongoose
  .connect("mongodb://127.0.0.1:27017/simple-blog-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Controllers
const articlesController = require("./controllers/article");

// Routers
app.post("/articles", articlesController.create);
app.patch("/articles/:id", articlesController.update);
app.get("/articles/:id", articlesController.read);
app.get("/articles", articlesController.readAll);
app.delete("/articles/:id", articlesController.delete);

// Start Server
app.listen(3000, () => console.log("Server started on port 3000"));
