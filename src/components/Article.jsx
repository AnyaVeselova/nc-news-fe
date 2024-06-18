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
import { fetchArticleById } from "../utils/api";
import { useEffect, useState } from "react";

export default function Article({ article }) {
  const [articleWithBody, setArticleWithoBody] = useState(null);

  useEffect(() => {
    fetchArticleById(article.article_id).then((response) => {
      setArticleWithoBody(response);
    });
  }, [article.article_id]);

  function formatDate(created_at) {
    return created_at.split("T")[0];
  }

  if (!articleWithBody) {
    return null;
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        image={articleWithBody.article_img_url}
        alt={articleWithBody.title}
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
          Topic: {articleWithBody.topic}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Author: {articleWithBody.author}
        </Typography>
        <Typography flexBasis="150px" variant="body2" color="text.secondary">
          Date: {formatDate(articleWithBody.created_at)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          Votes: {articleWithBody.votes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comments: {articleWithBody.comment_count}
        </Typography>
      </Box>
    </Card>
  );
}
