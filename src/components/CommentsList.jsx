import { CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
import PostComment from "./PostComment";
import { v4 as uniqueKey } from "uuid";

export default function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return (
      <CircularProgress
        sx={{ justifySelf: "center", alignSelf: "center", m: "20px" }}
        width={210}
        height={118}
        t
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
            <Link
              to={`/comments/${comment.comment_id}`}
              style={{ textDecoration: "none" }}
            >
              <Comment comment={comment} />
            </Link>
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
