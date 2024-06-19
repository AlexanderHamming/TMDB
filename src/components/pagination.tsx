import Button from "react-bootstrap/Button";
import PaginationProps from "../types/paginationTypes";

const Pagination: React.FC<PaginationProps> = ({
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  currentPage,
  totalPages,
  isLoading,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="prev">
        <Button
          disabled={!hasPreviousPage || isLoading}
          onClick={onPreviousPage}
          variant="primary"
        >
          Previous Page
        </Button>
      </div>

      <div className="page">
        Page {currentPage}
        {totalPages && <>/{totalPages}</>}
      </div>

      <div className="next">
        <Button
          disabled={!hasNextPage || isLoading}
          onClick={onNextPage}
          variant="primary"
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
