import React from "react";

export const SortBar = () => {
  return (
    <div className="sort-bar">
      <div className="container">
        <p className="results">Showing 1-6 of 32 results</p>
        <div className="sort">
          <p>Sort by popularity</p>
          <p className="mdi mdi-chevron-down"></p>
        </div>
      </div>
    </div>
  );
};
