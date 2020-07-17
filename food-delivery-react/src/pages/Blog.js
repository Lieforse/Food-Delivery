import React from "react";
import { NewsBar } from "../components/blog/sort_bar";
import { SideBar } from "../components/blog/side_bar";
import { BlogContent } from "../components/blog/news_section";

class Blog extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <NewsBar />
        <div className="container blog-container">
          <SideBar />
          <BlogContent />
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.querySelector("#navbar-js").classList.add("active");
  }
  componentWillUnmount() {
    document.querySelector("#navbar-js").classList.remove("active");
  }
}

export default Blog;
