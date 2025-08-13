import MoreVertIcon from "@mui/icons-material/MoreVert";
import { blue } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";

export default function SocialCard(props) {
  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: blue[500] }}
          aria-label={props.username + "'s review"}
        >
          {props.username[0]}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={props.title}
      subheader={props.date}
    />
  );
}
