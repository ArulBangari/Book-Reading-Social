import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import SocialHeader from "./SocialHeader";
import SocialContent from "./SocialContent";
import SocialExpand from "./SocialExpand";
import { formatTime } from "./helper";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SocialCardLayout(props) {
  const [notes, setNotes] = useState([]);
  const username = props.review.username;
  const title = props.review.title;
  const date = new Date(props.review.created_at);

  const formatted = formatTime(date);
  const cover_url = props.review.cover_url;
  const review = props.review.review;
  const book_id = props.review.book_id;
  const user_id = props.review.user_id;

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await axios.get("http://localhost:4000/notes", {
          params: { book_id: book_id, user_id: user_id },
        });
        setNotes(response.data.notes);
      } catch (err) {
        setNotes([]);
        console.log(err);
      }
    }
    getNotes();
  }, []);

  return (
    <Card sx={{ width: "100%", maxWidth: 600, borderRadius: 10, mt: 2 }}>
      <div className="social-items-center">
        <SocialHeader username={username} title={title} date={formatted} />
        <CardMedia
          component="img"
          height="300"
          image={cover_url}
          alt={`Cover of ${title}`}
          sx={{ objectFit: "contain" }}
        />
        <SocialContent review={review} />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </div>
      <SocialExpand notes={notes} user_id={user_id} />
    </Card>
  );
}
