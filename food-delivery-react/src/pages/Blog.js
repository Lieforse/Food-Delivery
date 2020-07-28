import React from "react";
import { connect } from "react-redux";
import { newsFetchData } from "../components/actions/newsActions";

import { NewsBar } from "../components/blog/sort_bar";
import { SideBar } from "../components/blog/side_bar";
import BlogContent from "../components/blog/news_section";

class Blog extends React.Component {
  componentDidMount() {
    document.querySelector("#navbar-js").classList.add("active");
    this.props.fetchData();
    console.log("props-after: ", this.props);
  }
  componentWillUnmount() {
    console.log(document);
    document.querySelector("#navbar-js").classList.remove("active");
  }

  render() {
    return (
      <div className="wrapper">
        <NewsBar />
        <div className="container blog-container">
          <SideBar />
          <BlogContent
            news=/* {newsReducer} */ {this.props.news}
            filteredNews={this.props.filteredNews}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("newsState", state);
  return {
    news: state.newsReducer.news,
    filteredNews: state.newsReducer.filteredNews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(newsFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
