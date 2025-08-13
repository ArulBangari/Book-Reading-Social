"use client";

import { Fab, TextField, Rating, Button, Stack } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useState } from "react";

export default function NoteReviewButtons(props) {
  const [visibleInputs, setVisibleInputs] = useState({
    showNote: false,
    showReview: false,
  });

  const [inputs, setInputs] = useState({
    note: "",
    review: "",
    rating: 0,
  });

  function handleClick(event) {
    const name = event.currentTarget.name;
    setVisibleInputs((previous) => {
      return { ...previous, [name]: !visibleInputs[name] };
    });
  }

  function handleChange(event) {
    let value = event.target.value;
    const name = event.target.name;
    setInputs((previous) => {
      if (name === "rating") {
        value = previous.rating === value ? "" : value;
      }
      return { ...previous, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    props.sendData(inputs.note, inputs.rating, inputs.review);
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ paddingBottom: "16px" }}>
        <Fab sx={{ mr: 2 }} name="showReview" onClick={handleClick}>
          <RateReviewIcon />
        </Fab>
        <Fab name="showNote" onClick={handleClick}>
          <NotesIcon />
        </Fab>
      </div>
      <form className="review-note" onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {(visibleInputs.showReview || visibleInputs.showNote) && (
            <Rating
              name="rating"
              value={inputs.rating}
              onChange={(event) => {
                handleChange(event);
              }}
            />
          )}
          {visibleInputs.showReview && (
            <TextField
              fullWidth
              id="review"
              name="review"
              label="Review"
              variant="outlined"
              multiline
              value={inputs.review}
              onChange={(event) => {
                handleChange(event);
              }}
            />
          )}
          {visibleInputs.showNote && (
            <TextField
              fullWidth
              id="note"
              name="note"
              label="Note"
              variant="outlined"
              multiline
              value={inputs.note}
              onChange={(event) => {
                handleChange(event);
              }}
            />
          )}
          {(visibleInputs.showNote || visibleInputs.showReview) && (
            <Button type="submit" variant="contained">
              Add
            </Button>
          )}
        </Stack>
      </form>
    </div>
  );
}
