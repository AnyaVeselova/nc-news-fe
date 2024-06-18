import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { fetchArticleById } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Article({ article }) {
  const { article_id } = useParams();
  const [articleWithBody, setArticleWithoBody] = useState(null);

  const centeredCard = article_id
    ? {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        margin: "6em 0",
      }
    : {};

  useEffect(() => {
    fetchArticleById(!article_id ? article.article_id : article_id).then(
      (response) => {
        setArticleWithoBody(response);
      }
    );
  }, [article_id]);

  function formatDate(created_at) {
    return created_at.split("T")[0];
  }

  if (!articleWithBody) {
    return <Skeleton variant="rect" width={210} height={118} />;
  }

  return (
    <Box sx={centeredCard}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "60%",
          margin: "0 auto",
        }}
      >
        <CardMedia
          component="img"
          image={articleWithBody.article_img_url}
          alt={articleWithBody.title}
          height="50%"
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
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
              <Typography
                variant=""
                component="span"
                sx={{ fontWeight: "bold" }}
              >
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
            <Typography
              flexBasis="150px"
              variant="body2"
              color="text.secondary"
            >
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
            <Typography mb="10px" lineHeight={1.2} variant="h6">
              {articleWithBody.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: !article_id ? 3 : null,
              }}
            >
              {articleWithBody.body}
            </Typography>
            {!article_id && <Button>Read more</Button>}
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
        </Box>
      </Card>
    </Box>
  );
}
