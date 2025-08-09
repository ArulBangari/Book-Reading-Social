"use client";

import { useState, useEffect } from "react";
import TitleInfo from "../components/TitleInfo";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "../../public/App.css";
import { useRouter } from "next/navigation";
import { CardActionArea } from "@mui/material";

export default function BookCard(props) {
  const router = useRouter();
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

  function handleClick() {
    const bookInfo = {
      authors: props.author_name,
      title: book.title,
      description: book.description,
      cover: book.covers
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : "/gray.png",
    };
    console.log(bookInfo);
    localStorage.setItem("bookInfo", JSON.stringify(bookInfo));
    router.push(`/add`);
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!book) {
    return;
  }

  return (
    <Card
      onClick={handleClick}
      className="book-card"
      sx={{
        maxWidth: "1000px",
        width: "1000px",
        margin: "10px",
        borderRadius: "10px",
        backgroundImage: "inherit",
        "&:hover": { transform: "scale(1.03)", boxShadow: 3, zIndex: 10 },
      }}
    >
      <CardActionArea sx={{ display: "flex" }}>
        <CardMedia
          className="media-card"
          component="img"
          sx={{
            width: "auto",
            height: "300px",
            margin: "10px",
            borderRadius: "15px",
          }}
          src={
            book.covers
              ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
              : "/gray.png"
          }
        />
        <TitleInfo
          authors={props.author_name}
          title={book.title}
          description={book.description}
        />
      </CardActionArea>
    </Card>
  );
}
