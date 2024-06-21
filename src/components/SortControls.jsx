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

export default function SortControls() {
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
            <Select labelId="sort-criteria-label" defaultValue="">
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="comment_count">Comment Count</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <IconButton>
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
