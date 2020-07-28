const initialState = {
  news: [],
  appliedSearchNews: "",
  appliedFiltersNews: [],
  filteredNews: [],
  appliedSortMethodNews: "",
};

function newsReducer(state = initialState, action) {
  if (action.type === "DATA_LOADED_NEWS") {
    console.log(action.news);
    return Object.assign({}, state, {
      news: action.news,
      filteredNews: action.news,
    });
  } else {
    return state;
  }
}

export default newsReducer;
