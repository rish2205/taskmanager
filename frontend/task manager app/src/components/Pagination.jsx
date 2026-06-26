function Pagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="pagination-controls">

      <button
        className="secondary-btn"
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 0}
      >
        Previous
      </button>

      <span className="page-info">
        Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
      </span>

      <button
        className="secondary-btn"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page + 1 >= totalPages}
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;