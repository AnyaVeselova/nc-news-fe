import { Link, useNavigate } from "react-router-dom";
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

  const handleReadMore = () => {
    //should navigate to an article component in future
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
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
          justifyContent: "space-between",
          backgroundColor: "#ADD8E6",
          padding: "8px 16px",
          gap: "16px",
        }}
      >
        <Typography gutterBottom variant="body2" color="text.secondary">
          <Typography variant="" component="span" sx={{ fontWeight: "bold" }}>
            topic:
          </Typography>{" "}
          {articleWithBody.topic}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            author:{" "}
          </Typography>
          {articleWithBody.author}
        </Typography>
        <Typography flexBasis="150px" variant="body2" color="text.secondary">
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            date:
          </Typography>{" "}
          {formatDate(articleWithBody.created_at)}
        </Typography>
      </Box>
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="body1"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 3,
          }}
        >
          {articleWithBody.body}
        </Typography>
        <Button onClick={handleReadMore}>Read more</Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#ADD8E6",
          padding: "8px 16px",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            Votes:
          </Typography>{" "}
          {articleWithBody.votes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            Comments:
          </Typography>{" "}
          {articleWithBody.comment_count}
        </Typography>
      </Box>
    </Card>
  );
}
