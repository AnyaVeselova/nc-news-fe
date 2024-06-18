import Article from "../components/Article";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import { Grid, Box } from "@mui/material";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((response) => {
      setArticles(response);
    });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: "1200px",
        width: "100%",
        padding: "50px 20px",
        margin: "50px auto",
      }}
    >
      {articles.map((article) => (
        <Grid
          item
          key={article.article_id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{ mb: "20px" }}
        >
          <Article article={article} />
        </Grid>
      ))}
    </Grid>
  );
}
