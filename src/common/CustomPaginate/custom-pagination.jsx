import React from "react";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);
    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    }
    if (currentPage > totalPages - 3) {
      startPage = Math.max(totalPages - 4, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (e, page) => {
    e.preventDefault();
    onPageChange(page);
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link page-link-prev"
            href="#"
            aria-label="Previous"
            tabIndex={currentPage === 1 ? -1 : 0}
            aria-disabled={currentPage === 1}
            onClick={handlePrevClick}
          >
            <span aria-hidden="true">
              <IonIcon icon={arrowBackOutline} />
            </span>{" "}
            Prev
          </a>
        </li>
        {currentPage > 3 && (
          <>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => handlePageClick(e, 1)}
              >
                1
              </a>
            </li>
            {currentPage > 4 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            <a
              className="page-link"
              href="/"
              onClick={(e) => handlePageClick(e, page)}
            >
              {page}
            </a>
          </li>
        ))}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => handlePageClick(e, totalPages)}
              >
                {totalPages}
              </a>
            </li>
          </>
        )}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link page-link-next"
            href="#"
            aria-label="Next"
            tabIndex={currentPage === totalPages ? -1 : 0}
            aria-disabled={currentPage === totalPages}
            onClick={handleNextClick}
          >
            Next{" "}
            <span aria-hidden="true">
              <IonIcon icon={arrowForwardOutline} />
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default CustomPagination;
