"use client";

import LoginPage from "./LoginPage.js";
import SearchBar from "../components/SearchBar.js";

export default function Page() {
  return (
    <div>
      <SearchBar />
      <LoginPage />
    </div>
  );
}
