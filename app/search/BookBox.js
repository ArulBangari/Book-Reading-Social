"use client";

import { useState, useEffect } from "react";
import TitleInfo from "../components/TitleInfo";
import axios from "axios";
import Card from "@mui/material/Card";
import "../../public/App.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BookBox(props) {
  const [book, setData] = useState(null);
  const [error, setError] = useState(null);
  const bookKey = props.bookKey;
  const searchQuery = "https://openlibrary.org" + bookKey + ".json";
  useEffect(() => {
    if (!searchQuery) return;

    async function fetchData() {
      try {
        const response = await axios.get(searchQuery);
        setData(response.data);
      } catch (err) {
        setError(err.message || "Unknown error");
      }
    }

    fetchData();
  }, [searchQuery]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!book) {
    return;
  }

  return (
    <Card
      className="book-card"
      sx={{
        display: "flex",
        maxWidth: "600px",
        margin: "10px",
        borderRadius: "10px",
        backgroundImage: "inherit",
      }}
    >
      <CardMedia
        className="media-card"
        component="img"
        sx={{
          width: "150px",
          height: "auto",
          margin: "10px",
          borderRadius: "15px",
          display: "block",
        }}
        src={
          book.covers
            ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
            : "/gray.webp"
        }
      />
      <TitleInfo
        authors={props.author_name}
        title={book.title}
        description={book.description}
      />
    </Card>
  );
}
