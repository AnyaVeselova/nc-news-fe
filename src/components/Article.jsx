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
  const { title, topic, author, created_at, votes, comment_count } = article;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        image="../../public/assets/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Typography gutterBottom component="div" variant="h5">
        {topic}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {author}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {created_at}
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
