import React from 'react';
import PropTypes from 'prop-types';

const generateArray = (noOfPages) => {
    const arr = [];
    for (let i = 1; i <= noOfPages; i++) { arr.push(i); }
    return arr;
};


const Pagination = ({ itemsCount, onPageChange, pageSize, currentPage }) => {

    const noOfPages = Math.ceil(itemsCount / pageSize);

    const pages = generateArray(noOfPages);

    if (noOfPages === 1) return null;

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {pages.map((page) =>
                    <li key={page} className="page-item">
                        <button
                            className={currentPage === page ? "page-link active" : "page-link"}
                            onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};


Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};



export default Pagination;