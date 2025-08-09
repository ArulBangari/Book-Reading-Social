import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";
import express from "express";
import e from "express";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 4000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});
db.connect();

app.get("/", async (req, res) => {
  const response = await db.query("SELECT * FROM books");
});

app.post("/add/book", async (req, res) => {
  try {
    await db.query(
      `INSERT INTO books (title, cover_url, author, summary) VALUES($1, $2, $3, $4) RETURNING id`,
      [req.title, req.cover_url, req.author, req.summary]
    );
    res.status(201).send("Created successfully");
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

app.post("/add/user", async (req, res) => {
  try {
    const date = new Date();
    const user_id = await db.query(
      `INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES($1, $2, $3, $4, $5)`,
      [req.body.username, req.body.email, req.body.password_hash, date, date]
    );
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

app.post("/add/review", async (req, res) => {
  try {
    const date = new Date();
    await db.query(
      `INSERT INTO reviews (, book_id, rating, notes, created_at, updated_at, username) VALUES($1, $2, $3, $4, $5, $6)`,
      [req.book_id, req.rating, req.notes, date, date, req.username]
    );
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
