"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import BookBox from "./BookBox";
import { v4 as uuidv4 } from "uuid";

export default function SearchPage(props) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { title, author } = props;

  if (!title && !author) {
    return <div>Please enter search criteria.</div>;
  }

  let searchQuery = `https://openlibrary.org/search.json?`;
  if (title) {
    searchQuery += `title=${title}&`;
  }
  if (author) {
    searchQuery += `author=${author}&`;
  }

  searchQuery = searchQuery + "limit=10";

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

  function getError(err) {
    setError[err];
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (data === null) {
    return;
  }

  return (
    <div>
      <h1>Number found: {data.numFound}</h1>
      {data.docs.map((book) => {
        book = { uuid: uuidv4(), ...book };
        return (
          <BookBox
            key={book.uuid}
            author_name={book.author_name}
            bookKey={book.key}
            getError={getError}
          />
        );
      })}
    </div>
  );
}
