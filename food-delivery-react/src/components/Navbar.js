import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.menuOpener = this.menuOpener.bind(this);
  }

  menuOpener = () => {
    const menuBtn = document.querySelector(".menu-btn-js");
    const smallNavBar = document.querySelector(".small-navbar-js");
    const smallNavBarBg = document.querySelector(".small-navbar-js-bg");
    const header = document.querySelector("#navbar-js");
    const currentUrl = window.location.href;
    const currentUrlArr = currentUrl.split("/");

    if (currentUrlArr[currentUrlArr.length - 1] === "") {
      if (menuBtn.classList.contains("open")) {
        menuBtn.classList.remove("open");
        smallNavBar.classList.remove("active");
        header.classList.remove("active");
        smallNavBarBg.classList.remove("active");
      } else {
        menuBtn.classList.add("open");
        smallNavBar.classList.add("active");
        header.classList.add("active");
        smallNavBarBg.classList.add("active");
      }

      if (window.scrollY <= 50 && !menuBtn.classList.contains("open")) {
        header.classList.remove("active");
      } else {
        header.classList.add("active");
      }
    } else {
      if (menuBtn.classList.contains("open")) {
        menuBtn.classList.remove("open");
        smallNavBar.classList.remove("active");
        smallNavBarBg.classList.remove("active");
      } else {
        menuBtn.classList.add("open");
        smallNavBar.classList.add("active");
        smallNavBarBg.classList.add("active");
      }
    }
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top" id="navbar-js">
        <div className="container">
          <a href="#" className="navbar-brand my-nav-brand">
            <img
              src={process.env.PUBLIC_URL + "images/logo/logo_header.png"}
              alt=""
              width="80px"
              heigth="62px"
            />
            <p>
              Food<span className="my-nav-span">Delivery</span>
            </p>
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
          </ul>
          <div
            className="menu-btn menu-btn-js"
            onClick={() => this.menuOpener()}
          >
            <div className="menu-btn__burger"></div>
          </div>

          <ul className="small-navbar small-navbar-js">
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
                Cart
              </NavLink>
            </li>
            <div className="small-navbar-bg small-navbar-js-bg"></div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
