export function newsFetchData() {
  return (dispatch) => {
    fetch("http://192.168.0.107:4001/news/select")
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: "DATA_LOADED_NEWS", news: response })
      )
      .catch(() => dispatch(newsHasErrored(true)));
  };
}

export function newsViewsCounter(id, views) {
  return (dispatch) => {
    fetch(`http://192.168.0.107:4001/news/update/views/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ views: ++views }),
    })
      .then(
        dispatch({
          type: "NEWS_VIEWS_UPDATE",
          newsUpdater: { id: id, views: views },
        })
      )
      .catch(() => dispatch(newsHasErrored(true)));
  };
}

export function newsHasErrored(bool) {
  return {
    type: "NEWS_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function searchNews(value) {
  return {
    type: "NEWS_FILTER_SEARCH",
    value,
  };
}

export function newsAddCategoryFilter(value) {
  return {
    type: "NEWS_FILTER_CATEGORY_ADD",
    value,
  };
}

export function newsRemoveCategoryFilter(value) {
  return {
    type: "NEWS_FILTER_CATEGORY_REMOVE",
    value,
  };
}

export function sortNews(sortFilter) {
  return {
    type: "SORT_NEWS",
    sortFilter,
  };
}
