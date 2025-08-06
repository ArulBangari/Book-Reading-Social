"use client";

import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import "../../public/App.css";
import { useRouter } from "next/navigation";
import React from "react";

export default function SearchBar() {
  const router = useRouter();
  const [data, setData] = React.useState({
    title: "",
    author: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const search = () => {
    router.push(`/search?title=${data.title}&author=${data.author}`);
  };

  return (
    <form className="search-bar" onSubmit={search}>
      <input
        type="text"
        placeholder="Book Title"
        onChange={handleChange}
        name="title"
        value={data.title}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Author"
        onChange={handleChange}
        name="author"
        value={data.author}
        className="search-input"
      />
      <Fab type="submit" className="search-button" color="primary">
        <SearchIcon />
      </Fab>
    </form>
  );
}
