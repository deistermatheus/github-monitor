/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { updateAppQuery } from '../../actions';

const CommitPaginationControl = (props) => {
  const { dispatch, pagination, isLoading } = props;
  const { next, previous, page = 1 } = pagination;

  const incrementPage = (e) => {
    e.preventDefault();
    const nextPage = Number(page) + 1;
    dispatch(updateAppQuery({ page: nextPage }));
  };

  const decrementPage = (e) => {
    e.preventDefault();
    const previousPage = Number(page) - 1;
    dispatch(updateAppQuery({ page: previousPage }));
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination mt-4">
        <li className={previous && !isLoading ? 'page-item' : 'page-item disabled'}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={decrementPage}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">{page || 1}</a></li>
        <li className={next && !isLoading ? 'page-item' : 'page-item disabled'}>
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={incrementPage}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default CommitPaginationControl;
