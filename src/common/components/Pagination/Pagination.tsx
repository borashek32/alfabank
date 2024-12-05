import styles from './Pagination.module.css';

type Props = {
  page: number
  charactersLength: number
  itemsPerPage: number
  setPage: (newPage: number) => void
}

export const Pagination = ({
  page,
  charactersLength,
  itemsPerPage,
  setPage,
}: Props) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(charactersLength / itemsPerPage)) {
      setPage(newPage);
    }
  };

  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className={styles.pageNumber}>
        Page {page} from {Math.ceil(charactersLength / itemsPerPage)}
      </span>
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === Math.ceil(charactersLength / itemsPerPage)}
      >
        Next
      </button>
    </div>
  )
}