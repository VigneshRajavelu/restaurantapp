import { useState } from "react";
import useFetchData from "../hooks/useFetchData";

export default function Customers() {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = data.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.address.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleCustomers = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  return (
    <section className="section">
      <div className="section-heading">
        <span className="eyebrow">CUSTOMER DIRECTORY</span>
        <h1>Our Customers</h1>
        <p>Customer data loaded using a reusable API hook.</p>
      </div>

      <input
        className="customer-search"
        value={search}
        onChange={(e) => changeSearch(e.target.value)}
        placeholder="Search by name, email or city..."
      />

      {loading && <p>Loading customers...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <div className="customer-grid">
            {visibleCustomers.map((customer) => (
              <div className="customer-card" key={customer.id}>
                <div className="avatar">
                  {customer.name.charAt(0)}
                </div>
                <h3>{customer.name}</h3>
                <p>{customer.email}</p>
                <p>📍 {customer.address.city}</p>
                <p>🏢 {customer.company.name}</p>
              </div>
            ))}
          </div>

          {visibleCustomers.length === 0 && (
            <p className="empty-state">No customers match your search.</p>
          )}

          <div className="pagination">
            <button
              className="secondary-btn"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="secondary-btn"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}