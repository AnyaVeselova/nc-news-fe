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
import { useLocation } from "react-router-dom";
import ErrorPage from "../errorHandling/ErrorPage";

export default function Article({ article, error, setError }) {
  const location = useLocation();
  const articleFromLinkState = location.state;

  const [commentCount, setCommentCount] = useState(
    articleFromLinkState
      ? articleFromLinkState.comment_count
      : article && article.comment_count
      ? article.comment_count
      : null
  );
  const { article_id } = useParams();
  const [articleWithBody, setArticleWithBody] = useState(null);
  const [votes, setVotes] = useState(
    articleFromLinkState
      ? articleFromLinkState.votes
      : article && article.votes
      ? article.votes
      : null
  );
  const [voteError, setVoteError] = useState(null);
  const [voteDirection, setVoteDirection] = useState(null);

  useEffect(() => {
    fetchArticleById(!article_id ? article.article_id : article_id)
      .then((response) => {
        setArticleWithBody(response);
        setVotes(response.votes);
        setCommentCount(response.comment_count);
      })
      .catch((err) => {
        setError(err);
      });
  }, [article_id, error, commentCount, votes]);

  function formatDate(created_at) {
    return created_at.split("T")[0];
  }

  function handleVote(type) {
    const initialVotes = votes;
    if (type === voteDirection) {
      setVotes(initialVotes);
      setVoteDirection(null);
      return;
    } else {
      const num = type === "upvote" ? 1 : -1;

      const updatedVotes = votes + num;
      setVotes(updatedVotes);
      setArticleWithBody((prevArticle) => ({
        ...prevArticle,
        votes: updatedVotes,
      }));
      setVoteDirection(type);
      patchArticle(article_id, num)
        .then((updatedArticle) => setVotes(updatedArticle.votes))
        .catch((err) => {
          setVotes(initialVotes);
          setVoteError(err.message);
          setHasVoted(null);
        });
    }
  }

  // if (error) {
  //   return <ErrorPage errorCode={error.status} msg={error.msg} />;
  // }

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
            {articleFromLinkState ? (
              <IconButton
                aria-label="upvote"
                onClick={() => handleVote("upvote")}
              >
                <ThumbUp />
              </IconButton>
            ) : (
              <Typography
                variant="body2"
                component="span"
                color="text.secondary"
                sx={{ fontWeight: "bold" }}
              >
                Votes:
              </Typography>
            )}
            <Typography variant="body2">{articleWithBody.votes}</Typography>
            {articleFromLinkState ? (
              <IconButton
                aria-label="downvote"
                onClick={() => handleVote("downvote")}
              >
                <ThumbDown />
              </IconButton>
            ) : (
              ""
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            <Typography
              variant="body2"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              Comments:
            </Typography>{" "}
            {commentCount}
          </Typography>
        </Box>
        {article_id && (
          <CommentsList
            error={error}
            setError={setError}
            article_id={article_id}
            setCommentCount={setCommentCount}
          />
        )}
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
