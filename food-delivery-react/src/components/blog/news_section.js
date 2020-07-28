import React from "react";

class BlogContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 6,
      currentPage: 1,
      currentText: "",
    };
    this.paginateNews = this.paginateNews.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentWillMount() {
    this.paginateNews();
  }

  paginateNews = () => {
    const indexOfLastPost = this.state.postsPerPage * this.state.currentPage;
    const indexOfFistPost =
      (this.state.currentPage - 1) * this.state.postsPerPage;
    const currentPosts = this.props.filteredNews.slice(
      indexOfFistPost,
      indexOfLastPost
    );
    let arr = [];

    const readMoreFunc = (content) => {
      console.log(content);
      this.state.currentText = content;
    };

    if (this.props.filteredNews[0] === undefined) {
      return false;
    } else {
      arr = currentPosts.map((news) => (
        <div className="col-auto" key={news.news_id}>
          <div className="card">
            <img src={news.image} alt="" />
            <div className="card-body">
              <h5 className="card-title">{news.name}</h5>
              <p className="card-text">
                {this.state.currentText !== ""
                  ? this.state.currentText
                  : news.content.slice(0, 240)}
                ...
              </p>
            </div>
            <div className="card-info">
              <div className="info-container">
                <p className="likes">
                  <span className="mdi mdi-eye"></span> 145
                </p>
                <p className="date">
                  <span className="mdi mdi-calendar"></span>
                  {news.date}
                </p>
              </div>
              <button
                className="btn"
                onClick={() => readMoreFunc(news.content)}
              >
                Read more
              </button>
            </div>
          </div>
        </div>
      ));
    }
    return arr;
  };

  pagination = () => {
    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil(this.props.filteredNews.length / this.state.postsPerPage);
      ++i
    ) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <div className="page-link" onClick={() => this.paginate(number)}>
                {number}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  paginate = (number) => {
    this.setState({ currentPage: number });
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="news-section">
        <div className="row">
          {this.paginateNews()}
          {/* <div className="col-auto">
            <div className="card">
              <img src="/images/images/blog/blog.jpg" alt="" />
              <div className="card-body">
                <h5 className="card-title">
                  Vestibulum tincidunt mauris eu varius
                </h5>
                <p className="card-text">
                  Morbi rhoncus facilisis elit in posuere. Duis pretium sem ac
                  ipsum pellentesque auctor. Vivamus mollis lacus in purus
                  luctus sollicitudin.
                </p>
              </div>
              <div className="card-info">
                <div className="info-container">
                  <p className="likes">
                    <span className="mdi mdi-heart-outline"></span> 145
                  </p>
                  <p className="date">
                    <span className="mdi mdi-calendar"></span> July 22, 2020
                  </p>
                </div>
                <a href="" className="btn">
                  Read more
                </a>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="card">
              <img src="/images/images/blog/blog.jpg" alt="" />
              <div className="card-body">
                <h5 className="card-title">
                  Vestibulum tincidunt mauris eu varius
                </h5>
                <p className="card-text">
                  Morbi rhoncus facilisis elit in posuere. Duis pretium sem ac
                  ipsum pellentesque auctor. Vivamus mollis lacus in purus
                  luctus sollicitudin.
                </p>
              </div>
              <div className="card-info">
                <div className="info-container">
                  <p className="likes">
                    <span className="mdi mdi-heart-outline"></span> 145
                  </p>
                  <p className="date">
                    <span className="mdi mdi-calendar"></span> July 22, 2020
                  </p>
                </div>
                <a href="" className="btn">
                  Read more
                </a>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="card">
              <img src="/images/images/blog/blog.jpg" alt="" />
              <div className="card-body">
                <h5 className="card-title">
                  Vestibulum tincidunt mauris eu varius
                </h5>
                <p className="card-text">
                  Morbi rhoncus facilisis elit in posuere. Duis pretium sem ac
                  ipsum pellentesque auctor. Vivamus mollis lacus in purus
                  luctus sollicitudin.
                </p>
              </div>
              <div className="card-info">
                <div className="info-container">
                  <p className="likes">
                    <span className="mdi mdi-heart-outline"></span> 145
                  </p>
                  <p className="date">
                    <span className="mdi mdi-calendar"></span> July 22, 2020
                  </p>
                </div>
                <a href="" className="btn">
                  Read more
                </a>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="card">
              <img src="/images/images/blog/blog.jpg" alt="" />
              <div className="card-body">
                <h5 className="card-title">
                  Vestibulum tincidunt mauris eu varius
                </h5>
                <p className="card-text">
                  Morbi rhoncus facilisis elit in posuere. Duis pretium sem ac
                  ipsum pellentesque auctor. Vivamus mollis lacus in purus
                  luctus sollicitudin.
                </p>
              </div>
              <div className="card-info">
                <div className="info-container">
                  <p className="likes">
                    <span className="mdi mdi-heart-outline"></span> 145
                  </p>
                  <p className="date">
                    <span className="mdi mdi-calendar"></span> July 22, 2020
                  </p>
                </div>
                <a href="" className="btn">
                  Read more
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default BlogContent;
