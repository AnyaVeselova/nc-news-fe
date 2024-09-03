import { Pagination, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface PaginatorProps {
  currentPage: number;
  totalArticles: number;
  articlesPerPage: number;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalArticles,
  articlesPerPage,
  setSearchParams,
}) => {
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    currentPage: number
  ) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("p", currentPage.toString());
      return newSearchParams;
    });
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
      />
    </Box>
  );
};

export default Paginator;
