import pg from "pg";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";

dotenv.config({ path: "./.env" });
const saltRounds = 10;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

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

app.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      loggedIn: true,
      username: req.user.username,
    });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: info.message || "Login failed" });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ success: true, username: user.username });
    });
  })(req, res, next);
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await db.query(
      `SELECT * FROM users where (username=$1 or email=$2)`,
      [username, email]
    );
    if (result.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          return res.status(500).send({ error: `${err}` });
        } else {
          const result = await db.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) return next(error);
            return res
              .status(200)
              .json({ success: true, username: user.username });
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).send({ error: `${err}` });
  }
});

app.post("/add/book", async (req, res) => {
  try {
    await db.query(
      `INSERT INTO books (title, cover_url, author, summary) VALUES($1, $2, $3, $4) RETURNING id`,
      [req.title, req.cover_url, req.author, req.summary]
    );
    return res.status(201).send("Created successfully");
  } catch (err) {
    return res.status(500).json({ error: `${err}` });
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
    return res.status(500).json({ error: `${err}` });
  }
});

passport.use(
  new Strategy(async (user, password, done) => {
    try {
      const result = await db.query(
        "SELECT * FROM users WHERE email=$1 OR user=$1",
        [user]
      );
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password_hash;
        try {
          const match = await bcrypt.compare(password, storedHashedPassword);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          return done(err);
        }
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (result.rows.length == 0) {
      return done(new Error("User not found"));
    }
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
