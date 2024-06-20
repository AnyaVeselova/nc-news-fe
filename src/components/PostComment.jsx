import { TextField, Button, Avatar, Grid } from "@mui/material";
import { postComment } from "../utils/api";
import { useState } from "react";

export default function PostComment({
  article_id,
  setComments,
  setSuccess,
  setCommentCount,
}) {
  const [newComment, setNewComment] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Comment field can not be empty");
      return;
    }
    setAdding(true);
    setError(null);
    setSuccess(null);
    postComment(article_id, "grumpy19", newComment)
      .then((res) => {
        setComments((prev) => [res, ...prev]);
        setCommentCount((prev) => prev + 1);
        setNewComment("");
        setSuccess("Comment is added!");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      })

      .catch((err) => {
        setError("Comment not added, please try again");
      })
      .finally(() => {
        setAdding(false);
      });
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Avatar />
      </Grid>
      <Grid item xs>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Add your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error}
            disabled={adding}
          />
        </form>
      </Grid>
      <Grid item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={adding}
        >
          {adding ? "Posting..." : "Post"}
        </Button>
      </Grid>
    </Grid>
  );
}
