import TitleInfo from "../components/TitleInfo";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import NoteReviewButtons from "./NoteReviewButtons.js";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function InfoCard(props) {
  const router = useRouter();
  async function sendData(note, rating, review) {
    try {
      const response = await axios.post(
        "http://localhost:4000/add",
        {
          note: note,
          rating: rating,
          review: review,
          title: props.title,
          cover_url: props.cover,
          author: props.author,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/");
    } catch (err) {
      if (err.response?.status == 401) {
        console.log(err);
      } else if (err.response?.status == 400) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  }

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
      <NoteReviewButtons sendData={sendData} />
    </Card>
  );
}
