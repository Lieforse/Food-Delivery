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

export function newsHasErrored(bool) {
  return {
    type: "MEALS_HAS_ERRORED",
    hasErrored: bool,
  };
}
