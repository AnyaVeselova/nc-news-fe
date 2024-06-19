import { CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
import { v4 as uniqueKey } from "uuid";

export default function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
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
