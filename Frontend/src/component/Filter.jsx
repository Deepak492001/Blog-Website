// Filter component
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../service/ApiCategory";
import "../CSS/Filter.css";

const Filter = ({ setCategory }) => {
  const [filters, setFilters] = useState([]);

  async function fetchAllCategories() {
    const categoryData = await getAllCategories();
    setFilters(categoryData);
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  function filterHandler(categoryName) {
    setCategory(categoryName);
  }

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={() => filterHandler("ALL")}>
        ALL
      </button>
      {filters.map((filter) => (
        <button
          key={filter.categoryId}
          className="filter-button"
          onClick={() => filterHandler(filter.categoryName)}
        >
          {filter.categoryName}
        </button>
      ))}
    </div>
  );
};

export default Filter;
