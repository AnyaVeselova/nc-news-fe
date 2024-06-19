import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
import { v4 as uniqueKey } from "uuid";

export default function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((response) => {
      setComments(response);
    });
  }, []);

  if (!comments.length) {
    return (
      <CircularProgress
        sx={{ justifySelf: "center" }}
        width={210}
        height={118}
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
      {comments.map((comment) => (
        <Grid item key={comment.comment_id}>
          <Link
            to={`/comments/${comment.comment_id}`}
            style={{ textDecoration: "none" }}
          >
            <Comment comment={comment} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
