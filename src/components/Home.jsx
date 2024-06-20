import ArticlesList from "./ArticlesList";
import { Box } from "@mui/material";
import TopicsConsole from "./TopicsConsole";

function Home() {
  return (
    <Box
      sx={{
        mt: "8em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <TopicsConsole />
      <ArticlesList />;
    </Box>
  );
}

export default Home;
