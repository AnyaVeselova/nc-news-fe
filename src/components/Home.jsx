import ArticlesList from "./ArticlesList";
import { Box } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <ArticlesList />
    </Box>
  );
}

export default Home;
