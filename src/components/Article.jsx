import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          flexBasis="150px"
          gutterBottom
          component="body2"
          variant="body1"
        >
          Topic: {topic}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Author: {author}
        </Typography>
        <Typography flexBasis="150px" variant="body2" color="text.secondary">
          Date: {created_at.split("T")[0]}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          Votes: {votes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comments: {comment_count}
        </Typography>
      </Box>
    </Card>
  );
}
