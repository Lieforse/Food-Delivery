import React from "react";

class FourthSection extends React.Component {
  constructor(props) {
    super(props);

    this.datePrettier = this.datePrettier.bind(this);
  }

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

  render() {
    return (
      <div className="fourth-section">
        <div className="container">
          <div className="section-title">
            <h4>Our blog</h4>
            <h2>Latest posts</h2>
          </div>
          <div className="row">
            {this.props.filteredNews.slice(0, 3).map((news) => (
              <div className="col-auto" key={news.news_id}>
                <div className="card">
                  <img src={news.image} alt="" />
                  <div className="card-body">
                    <p className="card-text date">
                      {this.datePrettier(news.date)}
                    </p>
                    <h5 className="card-title">{news.name}</h5>
                    <p className="card-text">
                      {news.content_preview.slice(0, 122)[
                        news.content_preview.length - 1
                      ] === "." || ","
                        ? news.content_preview.slice(0, 121) + "..."
                        : news.content_preview.slice(0, 122) + "..."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default FourthSection;
