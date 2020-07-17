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

export function mealsFetchDataSuccess(meals) {
  return {
    type: "MEALS_FETCH_DATA_SUCCESS",
    meals,
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

/* export function mealsFetchData() {
  return (dispatch) => {
    dispatch(mealsIsLoading(true));

    fetch("http://192.168.0.107:4001/meal/select")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(mealsIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((meals) => dispatch(mealsFetchDataSuccess(meals)))
      .catch(() => dispatch(mealsHasErrored(true)));
  };
} */

/* export function fetchMeals() {
  return function (dispatch) {
    dispatch({
      type: "FETCH_MEALS_REQUEST",
    });
    return fetch("http://192.168.0.107:4001/meal/select")
      .then((response) => response.json().then((body) => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: "FETCH_MEALS_FAILURE",
            error: body.error,
          });
        } else {
          dispatch({
            type: "FETCH_MEALS_SUCCESS",
            meals: body,
          });
          console.log("cartActions:", body);
        }
      });
  };
} */
