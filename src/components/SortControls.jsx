import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SortControls() {
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");

  function handleSortChange(e) {
    navigate(`/articles?sort_by=${e.target.value}`);
  }

  function handleOrderChange() {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    navigate(`/articles?order=${order}`);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel id="sort-criteria-label">Sort By</InputLabel>
            <Select
              labelId="sort-criteria-label"
              defaultValue=""
              onChange={handleSortChange}
            >
              <MenuItem value="created_at">date</MenuItem>
              <MenuItem value="comment_count">comment count</MenuItem>
              <MenuItem value="votes">votes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <IconButton onClick={handleOrderChange}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <ArrowUpwardIcon />
              <ArrowDownwardIcon />
            </Box>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
