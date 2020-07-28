export function mealsFetchData() {
  return (dispatch) => {
    fetch("http://192.168.0.107:4001/meal/select")
      .then((response) => response.json())
      .then((response) => dispatch({ type: "DATA_LOADED", meals: response }))
      .catch(() => dispatch(mealsHasErrored(true)));
  };
}

export function mealsHasErrored(bool) {
  return {
    type: "MEALS_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function mealsIsLoading(bool) {
  return {
    type: "MEALS_IS_LOADING",
    isLoading: bool,
  };
}

export function addMealToCart(id) {
  return {
    type: "ADD_TO_CART",
    id,
  };
}

export function addMealQuantity(id) {
  return {
    type: "ADD_QUANTITY",
    id,
  };
}

export function subMealQuantity(id) {
  return {
    type: "SUB_QUANTITY",
    id,
  };
}

export function cartAddMealQuantity(id) {
  return {
    type: "CART_ADD_QUANTITY",
    id,
  };
}

export function cartSubMealQuantity(id) {
  return {
    type: "CART_SUB_QUANTITY",
    id,
  };
}

export function removeMealFromCart(id) {
  return {
    type: "CART_REMOVE_MEAL",
    id,
  };
}

export function searchMeals(value) {
  return {
    type: "MEALS_FILTER_SEARCH",
    value,
  };
}

export function addCategoryFilter(value) {
  return {
    type: "MEALS_FILTER_CATEGORY_ADD",
    value,
  };
}

export function removeCategoryFilter(value) {
  return {
    type: "MEALS_FILTER_CATEGORY_REMOVE",
    value,
  };
}

export function sortMeals(sortFilter) {
  return {
    type: "SORT_MEALS",
    sortFilter,
  };
}
