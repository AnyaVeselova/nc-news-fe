import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchALlTopics } from "../utils/api";
import { v4 as uniqueKey } from "uuid";

export default function TopicsConsole() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchALlTopics().then((topics) => {
      const topicsSlug = topics.map((topic) => topic.slug);
      setTopics(topicsSlug);
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {topics.map((topic, index) => (
        <Link
          key={uniqueKey()}
          to={`/articles/?topic=${topic}`}
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              backgroundColor: index % 2 === 0 ? "#FFC0CB" : "#90EE90",
              padding: "15px",
              margin: "0 10px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: index % 2 === 0 ? "#FF69B4" : "#32CD32",
              },
            }}
          >
            <Typography variant="h6" color="textPrimary">
              {topic}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
