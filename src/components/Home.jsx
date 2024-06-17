import ArticlesList from "./ArticlesList";
import { Box } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        m: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <ArticlesList />;
    </Box>
  );
}

export default Home;
