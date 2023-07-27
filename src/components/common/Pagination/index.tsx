import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

type PaginationProps = {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      activeClassName={`${styles.item} ${styles.active}`}
      pageClassName={`${styles.item} ${styles['pagination-page']}`}
      breakClassName={`${styles.item} ${styles['break-me']}`}
      previousClassName={`${styles.previous}`}
      nextClassName={`${styles.next}`}
      disabledClassName={styles['disabled-page']}
    />
  );
};

export default Pagination;
