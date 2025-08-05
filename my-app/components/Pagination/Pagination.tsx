import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel={'←'}
      nextLabel={'→'}
      breakLabel={'...'}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
