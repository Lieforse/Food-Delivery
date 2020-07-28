import React from "react";

export const FourthSection = () => {
  return (
    <div className="fourth-section">
      <div className="container">
        <div className="section-title">
          <h4>Our blog</h4>
          <h2>Latest posts</h2>
        </div>
        <div className="row">
          <div className="col-auto">
            <div className="card">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "images/images/fourth_section/blog-1.jpg"
                }
                alt=""
              />
              <div className="card-body">
                <p className="card-text date">June 20, 2020</p>
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eveniet, accusantium voluptatibus non fuga possimus
                  perferendis.
                </p>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="card">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "images/images/fourth_section/blog-1.jpg"
                }
                alt=""
              />
              <div className="card-body">
                <p className="card-text date">June 20, 2020</p>
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eveniet, accusantium voluptatibus non fuga possimus
                  perferendis.
                </p>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="card">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "images/images/fourth_section/blog-1.jpg"
                }
                alt=""
              />
              <div className="card-body">
                <p className="date">June 20, 2020</p>
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eveniet, accusantium voluptatibus non fuga possimus
                  perferendis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
