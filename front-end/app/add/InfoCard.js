import TitleInfo from "../components/TitleInfo";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import NotesSummaryButtons from "./NotesSummaryButtons.js";

export default function InfoCard(props) {
  return (
    <Card
      className="info-card"
      sx={{
        textAlign: "center",
        maxWidth: "1500px",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <CardMedia
        className="media-card"
        component="img"
        image={props.cover}
        sx={{
          width: "auto",
          height: "300px",
          margin: "0 auto",
          marginTop: "24px",
          borderRadius: "15px",
          display: "block",
        }}
      />
      <TitleInfo
        authors={props.author}
        title={props.title}
        description={props.description}
      />
      <NotesSummaryButtons />
    </Card>
  );
}
