"use client";

import InfoCard from "./InfoCard.js";
import { useEffect, useState } from "react";

export default function AddPage() {
  const [bookInfo, updateInfo] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("bookInfo");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      updateInfo(parsed);
      console.log(parsed.authors);
    }
  }, []);

  if (!bookInfo) {
    console.log("No data found");
  }

  return (
    <div className="add page">
      {bookInfo && (
        <InfoCard
          author={bookInfo.authors}
          title={bookInfo.title}
          description={bookInfo.description}
          cover={bookInfo.cover}
        />
      )}
    </div>
  );
}
