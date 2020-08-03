import React from "react";
import { connect } from "react-redux";
import { newsViewsCounter } from "../actions/newsActions";

class BlogContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 4,
      currentPage: 1,
      currentText: "",
      currentArticle: null,
    };
    this.paginateNews = this.paginateNews.bind(this);
    this.datePrettier = this.datePrettier.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentWillMount() {
    this.paginateNews();
  }

  componentDidUpdate() {
    if (this.state.currentArticle !== null) {
      if (
        document
          .querySelector(`.news${this.state.currentArticle}`)
          .querySelector(".active")
      ) {
        let newsCard = document.querySelector(
          `.news${this.state.currentArticle}`
        );
        let newsCardPos = newsCard.offsetTop;
        window.scrollTo(0, newsCardPos - 150);
      } else {
        return false;
      }
    } else {
      return false;
    }
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

    const readMoreFunc = (id, views) => {
      let newsCard = document.querySelector(`.news${id}`);
      let newsCardPos = newsCard.offsetTop;
      window.scrollTo(0, newsCardPos);

      if (this.state.currentArticle === id) {
        this.setState({ currentArticle: null });
      } else {
        this.setState({ currentArticle: id });
        this.props.newsViewsCounter(id, views);
      }
    };

    if (this.props.filteredNews[0] === undefined) {
      return false;
    } else {
      arr = currentPosts.map((news) => (
        <div className={`col-auto news${news.news_id}`} key={news.news_id}>
          <div className="card">
            <img src={news.image} alt="" />
            <div className="card-body">
              <h5
                className="card-title"
                onClick={() => readMoreFunc(news.news_id, news.views)}
              >
                {news.name}
              </h5>
              <pre
                className={`card-text ${
                  news.news_id === this.state.currentArticle ? "active" : ""
                }`}
              >
                {news.news_id === this.state.currentArticle
                  ? news.content.replace(/\\n/g, "\n\n")
                  : news.content_preview}
              </pre>
            </div>
            <div className="card-info">
              <div className="info-container">
                <p className="likes">
                  <span className="mdi mdi-eye"></span> {news.views}
                </p>
                <p className="date">
                  <span className="mdi mdi-calendar"></span>{" "}
                  {this.datePrettier(news.date)}
                </p>
              </div>
              <button
                className="btn"
                onClick={() => readMoreFunc(news.news_id, news.views)}
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

  datePrettier = (elem) => {
    let dateRaw = elem.split(" ")[0].split("-");
    let date = [];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    date.push(months[Number(dateRaw[1]) - 1], dateRaw[2], dateRaw[0]);
    date = date.join(" ");
    return date;
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
            <li
              className="page-item"
              key={number}
              onClick={() => this.paginate(number)}
            >
              <div
                className={`page-link ${
                  this.state.currentPage === number ? "active" : ""
                }`}
              >
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
        <div className="row">{this.paginateNews()}</div>
        {this.pagination()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newsViewsCounter: (id, views) => {
      dispatch(newsViewsCounter(id, views));
    },
  };
};

export default connect(null, mapDispatchToProps)(BlogContent);
