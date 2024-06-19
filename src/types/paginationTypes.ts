export default interface PaginationProps {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onNextPage: () => void;
    onPreviousPage: () => void;
    currentPage: number;
    totalPages?: number;
    isLoading: boolean;
  }
  