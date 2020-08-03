const initialState = {
  news: [],
  newsAppliedSearch: "",
  newsAppliedFilters: [],
  filteredNews: [],
  newsAppliedSortMethod: "",
};

function newsReducer(state = initialState, action) {
  if (action.type === "DATA_LOADED_NEWS") {
    return Object.assign({}, state, {
      news: action.news,
      filteredNews: action.news,
    });
  }
  if (action.type === "NEWS_VIEWS_UPDATE") {
    let newState = Object.assign({}, state);
    let updatedNewsViews = state.filteredNews.find(
      (item) => item.news_id === action.newsUpdater.id
    );
    let foundId = state.filteredNews.findIndex(
      (item) => item.news_id === action.newsUpdater.id
    );

    updatedNewsViews.views = action.newsUpdater.views;

    newState.filteredNews[foundId] = updatedNewsViews;

    return newState;
  } else if (action.type === "NEWS_FILTER_SEARCH") {
    let newState = Object.assign({}, state);
    let value = action.value.toLowerCase();
    newState.newsAppliedSearch = value;
    if (state.newsAppliedFilters.length !== 0) {
      newState.filteredNews = state.news.filter(
        (item) =>
          item.name.toLowerCase().includes(value) &&
          state.newsAppliedFilters.includes(item.type.toLowerCase())
      );
    } else {
      newState.filteredNews = state.news.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
    }

    if (state.newsAppliedSortMethod.length !== 0) {
      let sortFilter = state.newsAppliedSortMethod;
      if (sortFilter === "Sort by popularity") {
        newState.filteredNews.sort((a, b) => b.views - a.views);
      } else if (sortFilter === "Sort by date") {
        newState.filteredNews.sort((a, b) => {
          let firstDate = [];
          firstDate = a.date.split(" ").slice(0, 1);
          firstDate.push("T", a.date.split(" ").slice(1, 2)[0], ":00");
          firstDate = firstDate.join("");

          let secondDate = [];
          secondDate = b.date.split(" ").slice(0, 1);
          secondDate.push("T", b.date.split(" ").slice(1, 2)[0], ":00");
          secondDate = secondDate.join("");

          return new Date(firstDate) - new Date(secondDate);
        });
        console.log("ftersort", newState.filteredNews);
      } else {
        newState.filteredNews.sort((a, b) => a.news_id - b.news_id);
      }
    }

    return newState;
  } else if (action.type === "NEWS_FILTER_CATEGORY_ADD") {
    let newState = Object.assign({}, state);
    let value = action.value;
    console.log("value", value);
    newState.newsAppliedFilters.push(value.toLowerCase());

    if (state.newsAppliedSearch.length !== 0) {
      newState.filteredNews = state.news.filter(
        (item) =>
          item.name.toLowerCase().includes(state.appliedSearch) &&
          state.newsAppliedFilters.includes(item.type.toLowerCase())
      );
    } else {
      newState.filteredNews = state.news.filter((item) =>
        state.newsAppliedFilters.includes(item.type.toLowerCase())
      );
    }

    if (state.newsAppliedSortMethod.length !== 0) {
      let sortFilter = state.newsAppliedSortMethod;
      if (sortFilter === "Sort by popularity") {
        newState.filteredNews.sort((a, b) => b.views - a.views);
      } else if (sortFilter === "Sort by date") {
        newState.filteredNews.sort((a, b) => {
          let firstDate = [];
          firstDate = a.date.split(" ").slice(0, 1);
          firstDate.push("T", a.date.split(" ").slice(1, 2)[0], ":00");
          firstDate = firstDate.join("");

          let secondDate = [];
          secondDate = b.date.split(" ").slice(0, 1);
          secondDate.push("T", b.date.split(" ").slice(1, 2)[0], ":00");
          secondDate = secondDate.join("");

          return new Date(firstDate) - new Date(secondDate);
        });
      } else {
        newState.filteredNews.sort((a, b) => a.news_id - b.news_id);
      }
    }

    return newState;
  } else if (action.type === "NEWS_FILTER_CATEGORY_REMOVE") {
    let newState = Object.assign({}, state);
    let value = action.value;

    newState.newsAppliedFilters.splice(
      newState.newsAppliedFilters.indexOf(value),
      1
    );

    if (state.newsAppliedFilters.length === 0) {
      if (state.newsAppliedSearch.length !== 0) {
        newState.filteredNews = state.news.filter((item) =>
          item.name.toLowerCase().includes(state.appliedSearch)
        );
      } else {
        newState.filteredNews = state.news; // BAGA
      }
    } else if (state.newsAppliedSearch.length !== 0) {
      newState.filteredNews = state.news.filter(
        (item) =>
          item.name.toLowerCase().includes(state.appliedSearch) &&
          state.newsAppliedFilters.includes(item.type.toLowerCase())
      );
    } else {
      newState.filteredNews = state.news.filter((item) =>
        state.newsAppliedFilters.includes(item.type.toLowerCase())
      );
    }

    if (state.newsAppliedSortMethod.length !== 0) {
      let sortFilter = state.newsAppliedSortMethod;
      console.log(sortFilter, "sdfasdf");
      if (sortFilter === "Sort by popularity") {
        newState.filteredNews.sort((a, b) => b.views - a.views);
      } else if (sortFilter === "Sort by date") {
        newState.filteredNews.sort((a, b) => {
          let firstDate = [];
          firstDate = a.date.split(" ").slice(0, 1);
          firstDate.push("T", a.date.split(" ").slice(1, 2)[0], ":00");
          firstDate = firstDate.join("");

          let secondDate = [];
          secondDate = b.date.split(" ").slice(0, 1);
          secondDate.push("T", b.date.split(" ").slice(1, 2)[0], ":00");
          secondDate = secondDate.join("");

          return new Date(firstDate) - new Date(secondDate);
        });
        console.log("ftersort", newState.filteredNews);
      } else {
        newState.filteredNews.sort((a, b) => a.news_id - b.news_id);
      }
    }

    return newState;
  } else if (action.type === "SORT_NEWS") {
    let newState = JSON.parse(JSON.stringify(state));
    let sortFilter = action.sortFilter;
    newState.appliedSortMethod = sortFilter;

    if (sortFilter === "Sort by popularity") {
      newState.filteredNews.sort((a, b) => b.views - a.views);
    } else if (sortFilter === "Sort by date") {
      newState.filteredNews.sort((a, b) => {
        let firstDate = [];
        firstDate = a.date.split(" ").slice(0, 1);
        firstDate.push("T", a.date.split(" ").slice(1, 2)[0], ":00");
        firstDate = firstDate.join("");

        let secondDate = [];
        secondDate = b.date.split(" ").slice(0, 1);
        secondDate.push("T", b.date.split(" ").slice(1, 2)[0], ":00");
        secondDate = secondDate.join("");

        return new Date(firstDate) - new Date(secondDate);
      });
      console.log("ftersort", newState.filteredNews);
    } else {
      newState.filteredNews.sort((a, b) => a.news_id - b.news_id);
    }
    return newState;
  } else {
    return state;
  }
}

export default newsReducer;
