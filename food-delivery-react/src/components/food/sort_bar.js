import React from "react";
import { sortMeals } from "../actions/mealsActions";
import { connect } from "react-redux";

class SortBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortList: [
        "Sort by popularity",
        "Sort by price: high to low",
        "Sort by price: low to high",
        "Sort by default",
      ],
    };
    this.showSortBar = this.showSortBar.bind(this);
  }

  showSortBar = () => {
    let sortBar = document.querySelector("#sort-bar-menu-js");

    if (sortBar.classList.contains("active")) {
      sortBar.classList.remove("active");
      document.querySelector("#sort-bar-title-js").classList.remove("active");
      document.addEventListener("click", outsideClickListener);
      function outsideClickListener(event) {
        if (
          !sortBar.contains(event.target) &&
          !document
            .querySelector("#sort-bar-container-js")
            .contains(event.target)
        ) {
          sortBar.classList.remove("active");
          document
            .querySelector("#sort-bar-title-js")
            .classList.remove("active");
          console.log("active");
        }
      }
    } else {
      sortBar.classList.add("active");
      document.querySelector("#sort-bar-title-js").classList.add("active");
    }
  };

  sortMethod = (sortItem) => {
    this.props.sortMeals(sortItem);
  };

  render() {
    return (
      <div className="sort-bar">
        <div className="container">
          <p className="results">
            Showing{" "}
            {this.props.filteredProducts.length > 6
              ? 6
              : this.props.filteredProducts.length}{" "}
            of {this.props.filteredProducts.length} results
          </p>
          <div
            className="sort-bar-container"
            id="sort-bar-container-js"
            onClick={() => this.showSortBar()}
          >
            <div className="sort sort-bar-title" id="sort-bar-title-js">
              <p>Sort by popularity</p>
              <p className="mdi mdi-chevron-down"></p>
            </div>
            <div className="sort-bar-menu" id="sort-bar-menu-js">
              {this.state.sortList.map((sortItem) => (
                <p
                  className="sort-bar-item"
                  onClick={() => this.sortMethod(sortItem)}
                  key={sortItem}
                >
                  {sortItem}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortMeals: (sortItem) => {
      dispatch(sortMeals(sortItem));
    },
  };
};

export default connect(null, mapDispatchToProps)(SortBar);
