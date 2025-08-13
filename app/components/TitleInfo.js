import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function TitleInfo(props) {
  const { title, authors } = props;
  return (
    <div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {authors && authors.length > 0 && (
          <Typography gutterBottom variant="h6" component="div">
            by {authors.join(", ")}
          </Typography>
        )}
        {typeof props.description == "string" && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {" "}
            {props.description}
          </Typography>
        )}
      </CardContent>
    </div>
  );
}
