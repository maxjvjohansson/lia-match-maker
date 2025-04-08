"use client";

import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalProfiles,
  profilesPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalProfiles / profilesPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const start = (currentPage - 1) * profilesPerPage + 1;
  const end = Math.min(start + profilesPerPage - 1, totalProfiles);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Föregående sida
      </button>
      <span>
        Visar {start} – {end}
      </span>
      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Nästa sida
      </button>
    </div>
  );
}
