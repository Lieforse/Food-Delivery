import React from "react";
import { NavLink } from "react-router-dom";

export const MiniNav = () => {
  return (
    <div className="mini-nav">
      <div className="container">
        <ul className="breadcrumbs">
          <li className="breadcrumb-item">
            <NavLink className="breadcrumb-link" activeClassName="active" to="/home">
              Home
            </NavLink>
          </li>
          {" / "}
          <li className="breadcrumd-item">
            <NavLink className="breadcrumb-link" activeClassName="active" to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
