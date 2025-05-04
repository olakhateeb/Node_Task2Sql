//Ola + Ali class 49-3

const express = require("express");
const app = express();
const articlesRoutes = require("./routes/articles");
const port = 4000;

app.use(express.json());

app.use("/articles", articlesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
