import React from "react";
import { sortNews } from "../actions/newsActions";
import { connect } from "react-redux";

class NewsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortList: ["Sort by popularity", "Sort by date", "Sort by default"],
      sortMethod: "Sort by default",
    };
    this.showSortBar = this.showSortBar.bind(this);
  }

  showSortBar = () => {
    let sortBar = document.querySelector("#sort-bar-news-js");

    if (sortBar.classList.contains("active")) {
      sortBar.classList.remove("active");
      document.querySelector("#sort-bar-title-js").classList.remove("active");
      document.addEventListener("click", outsideClickListener);
      function outsideClickListener(event) {
        if (
          !sortBar.classList.contains(event.target) &&
          !document
            .querySelector("#sort-bar-container-js")
            .contains(event.target)
        ) {
          sortBar.classList.remove("active");
          document
            .querySelector("#sort-bar-title-js")
            .classList.remove("active");
        }
      }
    } else {
      sortBar.classList.add("active");
      document.querySelector("#sort-bar-title-js").classList.add("active");
    }
  };

  sortMethod = (sortItem) => {
    this.props.sortNews(sortItem);
    this.setState({ sortMethod: sortItem });
  };

  render() {
    return (
      <div className="sort-bar">
        <div className="container">
          <p className="results">
            Showing{" "}
            {this.props.filteredNews.length > 4
              ? 4
              : this.props.filteredNews.length}{" "}
            of {this.props.filteredNews.length} results
          </p>
          <div
            className="sort-bar-container"
            id="sort-bar-container-js"
            onClick={() => this.showSortBar()}
          >
            <div className="sort sort-bar-title" id="sort-bar-title-js">
              <p>
                {/* Sort by popularity */}
                {this.state.sortMethod}
              </p>
              <p className="mdi mdi-chevron-down"></p>
            </div>
            <div className="sort-bar-menu" id="sort-bar-news-js">
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
    sortNews: (sortItem) => {
      dispatch(sortNews(sortItem));
    },
  };
};

export default connect(null, mapDispatchToProps)(NewsBar);
