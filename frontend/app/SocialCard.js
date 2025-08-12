"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SocialCardLayout from "./SocialCardLayout";

export default function SocialCard() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        setReviews(response.data.reviews);
      } catch (err) {
        setReviews([]);
        console.error(err);
      }
    }
    getPosts();
  }, []);

  return (
    <div className="social-card">
      {reviews.map((review) => (
        <SocialCardLayout key={review.id} review={review} />
      ))}
    </div>
  );
}
