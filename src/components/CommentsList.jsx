import { CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
import PostComment from "./PostComment";
import ErrorPage from "../errorHandling/ErrorPage";
import { v4 as uniqueKey } from "uuid";

export default function CommentsList({
  article_id,
  setCommentCount,
  error,
  setError,
}) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response.reverse());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id, error]);

  if (loading) {
    return (
      <CircularProgress
        sx={{ justifySelf: "center", alignSelf: "center", m: "20px" }}
        width={210}
        height={118}
      />
    );
  }

  if (error) {
    return (
      <ErrorPage
        msg={error.msg}
        errorCode={error.status}
        errorImg={"/assets/user_not_found.webp"}
      />
    );
  }
  return (
    <Grid
      container
      spacing={2}
      alignItems="stretch"
      sx={{
        maxWidth: "1200px",
        width: "100%",
        padding: "50px 20px",
        margin: "50px auto",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <PostComment
        key={uniqueKey()}
        article_id={article_id}
        setComments={setComments}
        setSuccess={setSuccess}
        setCommentCount={setCommentCount}
        error={error}
        setError={setError}
      />
      {success && (
        <Grid item xs={12}>
          <Typography variant="body2" color="success.main">
            {success}
          </Typography>
        </Grid>
      )}

      {comments.length > 0 ? (
        comments.map((comment) => (
          <Grid item key={comment.comment_id}>
            <Comment
              comment={comment}
              setComments={setComments}
              setCommentCount={setCommentCount}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          No comments yet!
        </Typography>
      )}
    </Grid>
  );
}
