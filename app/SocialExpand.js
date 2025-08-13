import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { formatTime } from "./helper";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function SocialExpand(props) {
  const [expanded, setExpanded] = React.useState(false);
  const notes = props.notes;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        sx={{ ml: 2, mb: 2 }}
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Notes:</Typography>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <Typography sx={{ marginBottom: 0.5 }}>
                  {note.content}
                </Typography>
                <Typography
                  sx={{ color: "gray", fontSize: "0.8rem", marginBottom: 2 }}
                >
                  ({formatTime(new Date(note.created_at))})
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Collapse>
    </div>
  );
}
