import React from "react";
import { connect } from "react-redux";
import {
  addMealToCart,
  addMealQuantity,
  subMealQuantity,
} from "../actions/mealsActions";

class FoodContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 6,
      currentPage: 1,
    };
    this.paginateMeals = this.paginateMeals.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentWillMount() {
    this.paginateMeals();
  }

  paginateMeals = () => {
    const indexOfLastPost = this.state.postsPerPage * this.state.currentPage;
    const indexOfFistPost =
      (this.state.currentPage - 1) * this.state.postsPerPage;
    const currentPosts = this.props.filteredProducts.slice(
      indexOfFistPost,
      indexOfLastPost
    );
    let arr = [];

    if (this.props.filteredProducts[0] === undefined) {
      return false;
    } else {
      arr = currentPosts.map((meal) => (
        <div className="col-auto" key={meal.meal_id}>
          <div className="card">
            <img src={meal.image} alt="" />
            <div className="card-body">
              <h5 className="card-title">{meal.name}</h5>
              <p className="card-text">{meal.components}</p>
            </div>
            <div className="add-container">
              <p className="price">{meal.totalPrice || meal.price}$</p>
              <div className="input-container">
                <div
                  className="button minus"
                  tabIndex="0"
                  onClick={() => this.subQuantity(meal.meal_id)}
                ></div>
                <input
                  type="text"
                  value={meal.quantity || 1}
                  maxLength="2"
                  className="counter"
                  placeholder="0"
                  readOnly
                />
                <div
                  className="button plus"
                  tabIndex="0"
                  onClick={() => this.addQuantity(meal.meal_id)}
                ></div>
              </div>
              <input
                type="button"
                className="button-submit"
                value="Add to cart"
                onClick={() => this.addToCart(meal.meal_id)}
              />
            </div>
          </div>
        </div>
      ));
    }
    return arr;
  };

  pagination = () => {
    const pageNumbers = [];

    for (
      let i = 1;
      i <=
      Math.ceil(this.props.filteredProducts.length / this.state.postsPerPage);
      ++i
    ) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              className="page-item"
              key={number}
              onClick={() => this.paginate(number)}
            >
              <div
                className={`page-link ${
                  this.state.currentPage === number ? "active" : ""
                }`}
              >
                {number}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  paginate = (number) => {
    this.setState({ currentPage: number });
    window.scrollTo(0, 0);
  };

  addToCart = (id) => {
    this.props.addMealToCart(id);
  };

  addQuantity = (id) => {
    this.props.addMealQuantity(id);
  };

  subQuantity = (id) => {
    this.props.subMealQuantity(id);
  };

  render() {
    return (
      <div className="food-content-section">
        <div className="row">{this.paginateMeals()}</div>
        {this.pagination()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMealToCart: (id) => {
      dispatch(addMealToCart(id));
    },
    addMealQuantity: (id) => {
      dispatch(addMealQuantity(id));
    },
    subMealQuantity: (id) => {
      dispatch(subMealQuantity(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(FoodContent);
