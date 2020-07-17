import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top my-nav" id="navbar-js">
      <div className="container">
        <a href="#" className="navbar-brand my-nav-brand">
          <img
            src={process.env.PUBLIC_URL + "images/logo/logo_header.png"}
            alt=""
            width="80px"
            heigth="62px"
          />
          Food<span className="my-nav-span">Delivery</span>
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/food" exact>
              Food
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/blog" exact>
              Blog
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link item-cart" to="/cart" exact>
              <i id="cart" className="mdi mdi-cart-outline"></i>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <a href="#" className="nav-link login-item">
              Login/Register
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};
