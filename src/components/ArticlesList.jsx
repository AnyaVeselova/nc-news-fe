import Article from "../components/Article";
import { CircularProgress, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import { Grid } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import TopicsConsole from "./TopicsConsole";
import SortControls from "./SortControls";
import ErrorPage from "../errorHandling/ErrorPage";

export default function ArticlesList({ error, setError }) {
  const [articles, setArticles] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const parameters = Object.fromEntries(searchParams);

    fetchArticles(parameters)
      .then((response) => {
        setArticles(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [searchParams, setError]);

  if (!articles.length && !error) {
    return (
      <CircularProgress
        sx={{ justifySelf: "center" }}
        width={210}
        height={118}
      />
    );
  }

  if (error) {
    return <ErrorPage errorCode={error.status} msg={error.msg} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        mt: "8em",
      }}
    >
      <Box sx={{ flex: 1, maxWidth: "1200px", position: "relative" }}>
        <Box sx={{ position: "absolute", top: -12, left: 38 }}>
          <SortControls setSearchParams={setSearchParams} />
        </Box>
        <Box sx={{ position: "absolute", top: 0, right: 28 }}>
          <TopicsConsole error={error} setError={setError} />
        </Box>
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
                  search: `?${searchParams.toString()}`,
                }}
                state={article}
                style={{ textDecoration: "none" }}
              >
                <Article article={article} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
