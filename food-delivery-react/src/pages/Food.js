import React from "react";
import { connect } from "react-redux";
import { mealsFetchData } from "../actions/mealsActions";

import SortBar from "../components/food/sort_bar";
import FilterBar from "../components/food/filter_bar";
import FoodContent from "../components/food/food_content";

class Food extends React.Component {
  componentDidMount() {
    document.querySelector("#navbar-js").classList.add("active");
    this.props.fetchData();
  }

  componentWillUnmount() {
    document.querySelector("#navbar-js").classList.remove("active");
  }

  render() {
    return (
      <div className="wrapper">
        <SortBar filteredProducts={this.props.filteredProducts} />
        <div className="container food-container">
          <FilterBar meals={this.props.meals} />
          <FoodContent
            meals={this.props.meals}
            filteredProducts={this.props.filteredProducts}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meals: state.mealsReducer.meals,
    filteredProducts: state.mealsReducer.filteredProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(mealsFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);
