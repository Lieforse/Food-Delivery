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
          <a
            href="https://www.instagram.com/"
            className="mdi mdi-instagram"
          ></a>
          <a href="https://www.facebook.com/" className="mdi mdi-facebook"></a>
          <a href="https://twitter.com/" className="mdi mdi-twitter"></a>
        </div>
      </div>
    </footer>
  );
};
