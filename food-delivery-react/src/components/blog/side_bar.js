import React from "react";

export const SideBar = () => {
  return (
    <div id="wrapper">
      <div className="sidebar">
        <div className="sidebar-header">
          <h5>Search filters</h5>
        </div>
        <div className="sidebar-content">
          <form action="">
            <input
              className="search"
              type="text"
              placeholder="Search some news..."
            />
            <label className="checkbox-container">
              <p>Lorem</p>
              <input type="checkbox" />
              <span className="round"></span>
            </label>
            <label className="checkbox-container">
              <p>Ipsum</p>
              <input type="checkbox" />
              <span className="round"></span>
            </label>
            <label className="checkbox-container">
              <p>Dolor</p>
              <input type="checkbox" />
              <span className="round"></span>
            </label>
            <label className="checkbox-container">
              <p>Sit</p>
              <input type="checkbox" />
              <span className="round"></span>
            </label>
            <label className="checkbox-container">
              <p>Amet</p>
              <input type="checkbox" />
              <span className="round"></span>
            </label>
            <div className="submit-container">
              <input type="submit" className="btn submit" value="Search" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
