import Article from "../components/Article";
import { CircularProgress, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import { Grid } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import TopicsConsole from "./TopicsConsole";
import SortControls from "./SortControls";
import ErrorPage from "../errorHandling/ErrorPage";
import Paginator from "./Paginator";

export default function ArticlesList({ error, setError }) {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const parameters = Object.fromEntries(searchParams);

    fetchArticles(parameters)
      .then((response) => {
        setArticles(response);
        setTotalArticles(response[0].total_count);
      })
      .catch((err) => {
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
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: "8em",
        }}
      >
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "20px",
              "@media (max-width: 781px)": {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                "& > *:first-of-type": {
                  order: 2,
                },
                "& > *:last-of-type": {
                  order: 1,
                },
              },
            }}
          >
            <SortControls setSearchParams={setSearchParams} />
            <TopicsConsole error={error} setError={setError} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
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
          </Box>
        </Grid>
      </Box>
      <Paginator
        totalArticles={totalArticles}
        setSearchParams={setSearchParams}
        currentPage={Number(searchParams.get("p")) || 1}
        articlesPerPage={Number(searchParams.get("limit") || 10)}
      />
    </Box>
  );
}
