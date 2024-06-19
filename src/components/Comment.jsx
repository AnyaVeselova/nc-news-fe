import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

export function Comment({ comment }) {
  console.log(comment);

  function formatDate(created_at) {
    return created_at.split("T")[0];
  }
  return (
    <Card style={{ margin: "20px 0" }}>
      <CardHeader
        avatar={
          <Avatar aria-label="author" sx={{ bgcolor: "secondary.main" }}>
            {comment.author[0].toUpperCase()}
          </Avatar>
        }
        title={comment.author}
        subheader={formatDate(comment.created_at)}
      />
      <CardContent>
        <Typography variant="body1">{comment.body}</Typography>
        <Box
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <IconButton aria-label="upvote">
            <ThumbUp />
          </IconButton>
          <Typography variant="body2" style={{ margin: "0 5px" }}>
            {comment.votes}
          </Typography>
          <IconButton aria-label="downvote">
            <ThumbDown />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
