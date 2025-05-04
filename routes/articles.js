//Ola + Ali class 49-3
const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

const db = dbSingleton.getConnection();

// a- add an article to table:
router.post("/", (req, res) => {
  const { title, content, author } = req.body;
  const query =
    "INSERT INTO articles (title, content, author) VALUES (?, ?, ?);";

  db.query(query, [title, content, author], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "article added!", id: results.insertId });
  });
});

//b- Get all articles
router.get("/", (req, res) => {
  const query = "SELECT * FROM articles;";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//c-  Get article by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM articles WHERE id = ?;";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ results });
  });
});

//d- Delete article
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM articles WHERE id = ?;";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "article deleted!" });
  });
});

//e- Get articles by author
router.get("/GetAuthor/:author", (req, res) => {
  const { author } = req.params;
  const query = "SELECT * FROM articles WHERE author = ?";
  db.query(query, [author], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//f- Get articles created after a specific date
router.get("/after/:date", (req, res) => {
  const { date } = req.params;
  const query = "SELECT * FROM articles WHERE created_at > ?";
  db.query(query, [date], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//g- Get articles ordered by creation date (newest first)
router.get("/sorted/by-date", (req, res) => {
  const query = "SELECT * FROM articles ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//h- Get total number of articles
router.get("/count/all", (req, res) => {
  const query = "SELECT COUNT(*) FROM articles";

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

//i- Search articles by keyword in the title
router.get("/search/title/:keyword", (req, res) => {
  const { keyword } = req.params;
  const query = "SELECT * FROM articles WHERE title LIKE ?";

  db.query(query, [`%${keyword}%`], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//j- Get a list of unique authors
router.get("/authors/distinct", (req, res) => {
  const query = "SELECT DISTINCT author FROM articles";

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
