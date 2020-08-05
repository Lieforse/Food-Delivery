import React from "react";
import { connect } from "react-redux";
import { newsFetchData } from "../actions/newsActions";

import NewsBar from "../components/blog/sort_bar";
import SideBar from "../components/blog/side_bar";
import BlogContent from "../components/blog/news_section";

class Blog extends React.Component {
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
        <NewsBar filteredNews={this.props.filteredNews} />
        <div className="container blog-container">
          <SideBar news={this.props.news} />
          <BlogContent
            news={this.props.news}
            filteredNews={this.props.filteredNews}
            scrollToArticleId={this.props.scrollToArticleId}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.newsReducer.news,
    filteredNews: state.newsReducer.filteredNews,
    scrollToArticleId: state.newsReducer.scrollToArticleId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(newsFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
