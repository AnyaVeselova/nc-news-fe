import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Skeleton,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { fetchArticleById } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { patchArticle } from "../utils/api";

export default function Article({ article }) {
  const { article_id } = useParams();
  const [articleWithBody, setArticleWithBody] = useState(null);
  const [votes, setVotes] = useState();
  const [voteError, setVoteError] = useState(null);

  useEffect(() => {
    fetchArticleById(!article_id ? article.article_id : article_id).then(
      (response) => {
        setArticleWithBody(response);
        setVotes(response.votes);
      }
    );
  }, [article_id]);

  function formatDate(created_at) {
    return created_at.split("T")[0];
  }

  function handleVote(num) {
    setVotes((prev) => prev + num);
    const updatedVotes = votes + num;
    setArticleWithBody((prevArticle) => ({
      ...prevArticle,
      votes: updatedVotes,
    }));

    patchArticle(article_id, num)
      .then((updatedArticle) => setVotes(updatedArticle.votes))
      .catch((err) => {
        setVotes(votes);

        setVoteError(err.message);
      });
  }
  //conditional rendering of loading elements on Home page and on Article page
  if (!articleWithBody && article_id) {
    return (
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress width={210} height={118} />
      </Card>
    );
  } else if (!articleWithBody && !article_id) {
    return <Skeleton width={210} height={118} />;
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: !article_id ? "90%" : "60%",
        margin: !article_id ? "0 auto" : "7em auto",
      }}
    >
      <CardMedia
        component="img"
        image={articleWithBody.article_img_url}
        alt={articleWithBody.title}
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
            alignItems: "center",
          }}
        >
          <Box
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <IconButton aria-label="upvote" onClick={() => handleVote(1)}>
              <ThumbUp />
            </IconButton>
            <Typography variant="body2">{articleWithBody.votes}</Typography>
            <IconButton aria-label="downvote" onClick={() => handleVote(-1)}>
              <ThumbDown />
            </IconButton>
          </Box>
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
        {article_id && <CommentsList article_id={article_id} />}
      </Box>
      <Snackbar
        open={!!voteError}
        autoHideDuration={6000}
        onClose={() => setVoteError(null)}
      >
        <Alert onClose={() => setVoteError(null)} severity="error">
          {voteError}
        </Alert>
      </Snackbar>
    </Card>
  );
}
