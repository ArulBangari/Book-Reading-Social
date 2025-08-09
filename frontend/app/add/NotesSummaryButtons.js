import { Fab, TextField, Rating, Button, Stack } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useState, useEffect } from "react";

export default function NotesSummaryButtons() {
  const [visibleInputs, setVisibleInputs] = useState({
    notes: false,
    summary: false,
  });

  const [inputs, setInputs] = useState({
    notes: "",
    summary: "",
    rating: "",
  });

  function handleClick(type) {
    setVisibleInputs((previous) => {
      return { ...previous, [type]: !visibleInputs[type] };
    });
  }

  function handleChange(event, type) {
    let value = event.target.value;
    setInputs((previous) => {
      if (type === "rating") {
        value = previous.rating === value ? "" : value;
      }
      return { ...previous, [type]: value };
    });
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ paddingBottom: "16px" }}>
        <Fab
          sx={{ mr: 2 }}
          onClick={() => handleClick("summary")}
          value={visibleInputs.summary}
        >
          <RateReviewIcon />
        </Fab>
        <Fab onClick={() => handleClick("notes")}>
          <NotesIcon />
        </Fab>
      </div>
      <form className="summary-notes">
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {(visibleInputs.summary || visibleInputs.notes) && (
            <Rating
              name="user-rating"
              value={inputs.rating}
              onChange={(event) => {
                handleChange(event, "rating");
              }}
            />
          )}
          {visibleInputs.summary && (
            <TextField
              fullWidth
              id="summary"
              name="summary"
              label="Summary"
              variant="outlined"
              multiline
              value={inputs.summary}
              onChange={(event) => {
                handleChange(event, "summary");
              }}
            />
          )}
          {visibleInputs.notes && (
            <TextField
              fullWidth
              id="notes"
              name="notes"
              label="Notes"
              variant="outlined"
              multiline
              value={inputs.notes}
              onChange={(event) => {
                handleChange(event, "notes");
              }}
            />
          )}
          {(visibleInputs.notes || visibleInputs.summary) && (
            <Button type="submit" variant="contained">
              Add
            </Button>
          )}
        </Stack>
      </form>
    </div>
  );
}
