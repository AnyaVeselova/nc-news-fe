import Article from "../components/Article";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((response) => {
      setArticles(response);
    });
  }, []);

  if (!articles.length) {
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
        margin: "0 auto",
        height: "100%",
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
          <Link
            to={{
              pathname: `/articles/${article.article_id}`,
            }}
            state={article}
            style={{ textDecoration: "none" }}
          >
            <Article article={article} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
