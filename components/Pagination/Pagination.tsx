import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
};

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={styles.button}
        aria-label="Go to previous page"
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage > 1 ? 0 : -1}
      >
        Previous
      </button>

      <span
        className={styles.pageInfo}
        aria-live="polite" 
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={styles.button}
        aria-label="Go to next page"
        aria-disabled={currentPage >= totalPages} 
        tabIndex={currentPage < totalPages ? 0 : -1} 
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
