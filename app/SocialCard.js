"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SocialCardLayout from "./SocialCardLayout";
import Typography from "@mui/material/Typography";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SocialCard() {
  console.log(backendURL);
  const [reviews, setReviews] = useState([]);
  const [check404, setCheck] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(backendURL + "/posts");
        setReviews(response.data.reviews);
      } catch (err) {
        if (err.status == 404) {
          setCheck(true);
        }
        setReviews([]);
        console.error(err);
      }
    }
    getPosts();
  }, []);

  return check404 ? (
    <Typography variant="h1" component="h1">
      Servers Loading. Please refresh page in 1 minute.
    </Typography>
  ) : (
    <div className="social-card">
      {reviews.map((review) => (
        <SocialCardLayout key={review.id} review={review} />
      ))}
    </div>
  );
}
