import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export default function ItemCard({ article }) {
  const {
    title,
    topic,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        image={article_img_url}
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Typography gutterBottom component="div" variant="body1">
        Topic: {topic}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Author: {author}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Date: {created_at.split("T")[0]}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Votes: {votes}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Comments: {comment_count}
      </Typography>
    </Card>
  );
}
