import React from "react";
import { NavLink } from "react-router-dom";

class SecondSection extends React.Component {
  constructor(props) {
    super(props);
    this.functionF = this.functionF.bind(this);
  }

  functionF = () => {
    let arr = [];
    let num = 0;
    for (let i = 0; i < 4; ++i) {
      num = i;
      if (this.props.meals[i] === undefined) {
        return false;
      } else if (num % 2 === 0) {
        arr.push(
          <div className="col-auto" key={this.props.meals[i].meal_id}>
            <div className="img">
              <img
                src={"images/images/second_section/specialities1.jpg"}
                alt=""
              />
            </div>
            <div className="text">
              <h3 className="title">{this.props.meals[i].name}</h3>
              <p>{this.props.meals[i].description}</p>
            </div>
          </div>
        );
      } else {
        arr.push(
          <div className="col-auto" key={this.props.meals[i].meal_id}>
            <div className="text">
              <h3 className="title">{this.props.meals[i].name}</h3>
              <p>{this.props.meals[i].description}</p>
            </div>
            <div className="img">
              <img
                src={"images/images/second_section/specialities1.jpg"}
                alt=""
              />
            </div>
          </div>
        );
      }
    }
    return arr;
  };

  render() {
    return (
      <div className="container">
        <div className="section-title">
          <h4>Our tasty offers</h4>
          <h2>Popular today</h2>
        </div>
        <div className="offers">
          <div className="row justify-content-center">{this.functionF()}</div>
          <NavLink className="nav-link" to="/food">
            <div className="btn">Show menu</div>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default SecondSection;
