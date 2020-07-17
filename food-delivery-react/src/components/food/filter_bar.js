import React from "react";
import { connect } from "react-redux";
import {
  searchMeals,
  addCategoryFilter,
  removeCategoryFilter,
} from "../actions/mealsActions";

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.categorySet = this.categorySet.bind(this);
  }

  categorySet = () => {
    let categories = [];
    return (categories = [
      ...new Set(this.props.meals.map((meal) => meal.type)),
    ].map((meal) => (
      <label className="checkbox-container">
        <p>{meal}</p>
        <input type="checkbox" />
        <span className="round"></span>
      </label>
    )));
    console.log(categories);
  };

  mealsFilterSearch = (event) => {
    let value = event.target.value;
    console.log(event);
    this.props.searchMeals(value);
  };

  mealsFilterCheckbox = (event) => {
    let category = event.target.value;
    if (event.target.checked) {
      console.log("add: ", category);
      this.props.addCategoryFilter(category);
    } else {
      console.log("remove: ", category);
      this.props.removeCategoryFilter(category);
    }
  };

  render() {
    return (
      <div id="wrapper">
        <div className="sidebar">
          <div className="sidebar-header">
            <h5>Search filters</h5>
          </div>
          <div className="sidebar-content">
            <form action="" /* onSubmit={this.mealsFilterSearch} */>
              <input
                className="search"
                type="text"
                placeholder="Search some food..."
                onChange={this.mealsFilterSearch}
              />
              {[...new Set(this.props.meals.map((meal) => meal.type))].map(
                (category) => (
                  <label className="checkbox-container" key={category}>
                    <p>{category}</p>
                    <input
                      value={category}
                      type="checkbox"
                      onChange={(event) => this.mealsFilterCheckbox(event)}
                    />
                    <span className="round"></span>
                  </label>
                )
              )}
              {/* <div className="submit-container">
                <input type="submit" className="btn submit" value="Search" />
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchMeals: (value) => {
      dispatch(searchMeals(value));
    },
    addCategoryFilter: (category) => {
      dispatch(addCategoryFilter(category));
    },
    removeCategoryFilter: (category) => {
      dispatch(removeCategoryFilter(category));
    },
  };
};

export default connect(null, mapDispatchToProps)(FilterBar);
