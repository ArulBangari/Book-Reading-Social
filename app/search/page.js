"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "../components/SearchBar";
import SearchPage from "./SearchPage";

function PageContent() {
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
