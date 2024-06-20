import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ThumbUp, ThumbDown, Delete } from "@mui/icons-material";
import { deleteCommentByCommentId } from "../utils/api";
import { useState } from "react";

export function Comment({ comment, setComments }) {
  const [deleting, setDeleting] = useState(false);

  function formatDate(created_at) {
    return created_at.split("T")[0];
  }

  function handleDelete(comment_id) {
    setDeleting(true);
    deleteCommentByCommentId(comment_id)
      .then(() => {
        setComments((prev) =>
          prev.filter((prevComment) => {
            return prevComment.comment_id !== comment_id;
          })
        );
      })
      .finally(() => {
        setDeleting(false);
      });
  }

  return (
    <Card style={{ margin: "20px 0" }}>
      <CardHeader
        avatar={
          <Avatar aria-label="author" sx={{ bgcolor: "secondary.main" }}>
            {comment.author[0].toUpperCase()}
          </Avatar>
        }
        title={comment.author}
        subheader={formatDate(comment.created_at)}
      />
      <CardContent>
        {deleting ? (
          <Typography variant="body1" color="success.main">
            The comment was deleted!
          </Typography>
        ) : (
          <Typography variant="body1">{comment.body}</Typography>
        )}

        <Box
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <IconButton aria-label="upvote">
            <ThumbUp />
          </IconButton>
          <Typography variant="body2" style={{ margin: "0 5px" }}>
            {comment.votes}
          </Typography>
          <IconButton aria-label="downvote">
            <ThumbDown />
          </IconButton>
        </Box>
        <Box>
          {comment.author === "grumpy19" && (
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(comment.comment_id)}
              disabled={deleting}
            >
              {deleting ? <CircularProgress size={24} /> : <Delete />}
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
