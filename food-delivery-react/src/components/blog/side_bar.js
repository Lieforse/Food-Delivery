import React from "react";
import { connect } from "react-redux";
import {
  searchNews,
  newsAddCategoryFilter,
  newsRemoveCategoryFilter,
} from "../../actions/newsActions";

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.unfoldFilterBar = this.unfoldFilterBar.bind(this);
  }

  newsFilterSearch = (event) => {
    let value = event.target.value;
    this.props.searchNews(value);
  };

  newsFilterCheckbox = (event) => {
    let category = event.target.value;
    if (event.target.checked) {
      this.props.newsAddCategoryFilter(category);
    } else {
      this.props.newsRemoveCategoryFilter(category);
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
                placeholder="Search some news..."
                onChange={this.newsFilterSearch}
              />
              {[...new Set(this.props.news.map((news) => news.type))].map(
                (category) => (
                  <label className="checkbox-container" key={category}>
                    <p>{category}</p>
                    <input
                      value={category}
                      type="checkbox"
                      onChange={(event) => this.newsFilterCheckbox(event)}
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
              {[...new Set(this.props.news.map((news) => news.type))].map(
                (category) => (
                  <label className="checkbox-container" key={category}>
                    <p>{category}</p>
                    <input
                      value={category}
                      type="checkbox"
                      onChange={(event) => this.newsFilterCheckbox(event)}
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
    searchNews: (value) => {
      dispatch(searchNews(value));
    },
    newsAddCategoryFilter: (category) => {
      dispatch(newsAddCategoryFilter(category));
    },
    newsRemoveCategoryFilter: (category) => {
      dispatch(newsRemoveCategoryFilter(category));
    },
  };
};

export default connect(null, mapDispatchToProps)(SideBar);
