import React from "react";
import { connect } from "react-redux";
import { mealsFetchData } from "../components/actions/mealsActions";
import { SortBar } from "../components/food/sort_bar";
import FilterBar from "../components/food/filter_bar";
import FoodContent from "../components/food/food_content";

class Food extends React.Component {
  /* constructor(props) {
    super(props);
  } */
  componentDidMount() {
    document.querySelector("#navbar-js").classList.add("active");
    this.props.fetchData();
  }

  componentWillUnmount() {
    document.querySelector("#navbar-js").classList.remove("active");
  }

  render() {
    /* if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the meals</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    } */

    return (
      <div className="wrapper">
        <SortBar />
        <div className="container food-container">
          <FilterBar meals={this.props.meals} />
          <FoodContent
            meals={this.props.meals}
            filteredProducts={this.props.filteredProducts}
          />
          {/* <ul>
            {this.props.meals.map((meals) => (
              <li key={meals.id}>{meals.name}</li>
            ))}
          </ul> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    filteredProducts: state.filteredProducts,
  };
};
/* const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
  };
}; */

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(mealsFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);

/* import React from "react";
import { connect } from "react-redux";
import { fetchMeals } from "../components/actions/cartActions";
import { SortBar } from "../components/food/sort_bar";
import { FilterBar } from "../components/food/filter_bar";
import FoodContent from "../components/food/food_content";

class Food extends React.Component {

  componentDidMount() {
    this.props.fetchMeals();
    document.querySelector("#navbar-js").classList.add("active");
    console.log(this.props);
    console.log(this.state.meals);
  }

  render() {
    return (
      <div className="wrapper">
        <SortBar />
        <div className="container food-container">
          <FilterBar />
          <FoodContent items={this.props.reducerState} />
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    document.querySelector("#navbar-js").classList.remove("active");
    console.log(this.props.reducerState);
    console.log(this.state.meals);
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps:", state.meals);
  return {
    reducerState: state.meals,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMeals: function () {
      dispatch(fetchMeals());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Food); */
