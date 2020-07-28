import React from "react";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>
          <span>&copy;2020 </span>food delivery
        </p>
        <img
          src={process.env.PUBLIC_URL + "/images/logo/logo_header.png"}
          alt=""
        />
        <div className="social-media">
          <a href="" className="mdi mdi-instagram"></a>
          <a href="" className="mdi mdi-facebook"></a>
          <a href="" className="mdi mdi-twitter"></a>
        </div>
      </div>
    </footer>
  );
};
