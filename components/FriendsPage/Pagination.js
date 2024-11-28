"use client"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useState } from 'react';

export default function Pagination({ totalPages = 10, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Determine if we are in the last four pages
    const isInLastFourPages = currentPage >= totalPages - 3;

    if (isInLastFourPages) {
      // If in the last four pages, show only the last four pages without ellipsis
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`w-8 h-8 flex items-center justify-center rounded font-bold ${
              currentPage === i ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show current page and next three pages
      for (let i = currentPage; i < currentPage + 3 && i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`w-8 h-8 flex items-center justify-center rounded font-bold ${
              currentPage === i ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {i}
          </button>
        );
      }

      // Ellipsis and last page if not close to the end
      if (currentPage + 2 < totalPages - 1) {
        pages.push(
          <span key="ellipsis" className="w-8 h-8 flex items-center justify-center">
            ...
          </span>
        );
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className="w-8 h-8 flex items-center justify-center rounded font-bold  text-gray-800"
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`p-2 ${currentPage === 1 ? 'text-gray-300' : 'text-black'}`}
      >
        <AiOutlineLeft className="h-5 w-5" />
      </button>

      {/* Page numbers */}
      <div className="flex space-x-1">{renderPageNumbers()}</div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 ${currentPage === totalPages ? 'text-gray-300' : 'text-black'}`}
      >
        <AiOutlineRight className="h-5 w-5" />
      </button>
    </div>
  );
}
