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

import { useState } from "react";

export default function SortControls({ setSearchParams }) {
  const [order, setOrder] = useState("asc");

  function handleSortChange(e) {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("sort_by", e.target.value);

      return prevSearchParams;
    });
  }

  function handleOrderChange() {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("order", order);
      return prevSearchParams;
    });
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
