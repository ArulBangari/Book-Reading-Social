"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import BookPage from "./BookPage";
import { v4 as uuidv4 } from "uuid";
import Pagination from "./PaginationBar";
import { getURL } from "./helpers";
import { useSearchParams } from "next/navigation";
const searchItems = 5;

export default function SearchPage(props) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";
  const page = searchParams.get("page") || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchQuery = getURL(title, author, page, searchItems);
    if (!searchQuery) return;
    console.log(searchQuery);

    async function fetchData() {
      try {
        const response = await axios.get(searchQuery);
        setData(response.data);
      } catch (err) {
        setError(err.message || "Unknown error");
      }
    }

    fetchData();
  }, [title, author, page]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (data === null) {
    return;
  }

  const numPages = Math.ceil(data.numFound / searchItems);

  return (
    <div className="search page">
      <h1>Number found: {data.numFound}</h1>
      {data.docs.map((book) => {
        book = { uuid: uuidv4(), ...book };
        return (
          <BookPage
            key={book.uuid}
            author_name={book.author_name}
            bookKey={book.key}
          />
        );
      })}
      <Pagination numPages={numPages} />
    </div>
  );
}
