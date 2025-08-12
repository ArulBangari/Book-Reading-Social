import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SocialContent(props) {
  return (
    <CardContent>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {props.review}
      </Typography>
    </CardContent>
  );
}
