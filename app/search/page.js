"use client";

import { useSearchParams } from "next/navigation";
import SearchBar from "../components/SearchBar.js";
import SearchPage from "./SearchPage.js";

export default function Page() {
  // Get search parameters from the URL
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const author = searchParams.get("author");
  const language = searchParams.get("language");

  return (
    <div>
      <SearchBar />
      <SearchPage title={title} author={author} language={language} />
    </div>
  );
}
