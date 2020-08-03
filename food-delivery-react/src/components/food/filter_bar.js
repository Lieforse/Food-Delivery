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

    /* this.categorySet = this.categorySet.bind(this); */
    this.unfoldFilterBar = this.unfoldFilterBar.bind(this);
  }

  /* categorySet = () => {
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
  }; */

  mealsFilterSearch = (event) => {
    let value = event.target.value;
    this.props.searchMeals(value);
  };

  mealsFilterCheckbox = (event) => {
    let category = event.target.value;
    if (event.target.checked) {
      this.props.addCategoryFilter(category);
    } else {
      this.props.removeCategoryFilter(category);
    }
  };

  unfoldFilterBar = () => {
    const miniSidebar = document.querySelector(".mini-sidebar");
    const miniSidebarHeader = document.querySelector(".sidebar-header-js");
    const miniSidebarContent = document.querySelector(".sidebar-content-js");
    if (miniSidebar.classList.contains("active")) {
      miniSidebar.classList.remove("active");
      miniSidebarHeader.classList.remove("active");
      miniSidebarContent.classList.remove("active");
    } else {
      miniSidebar.classList.add("active");
      miniSidebarHeader.classList.add("active");
      miniSidebarContent.classList.add("active");
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
            <form action="">
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
            </form>
          </div>
        </div>

        <div className="sidebar mini-sidebar mini-sidebar-js">
          <div
            className="sidebar-header sidebar-header-js"
            onClick={() => this.unfoldFilterBar()}
          >
            <h5>Search filters</h5>
          </div>
          <div className="sidebar-content sidebar-content-js">
            <form action="">
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
