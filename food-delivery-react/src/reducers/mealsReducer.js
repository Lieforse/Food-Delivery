const initialState = {
  meals: [],
  cart: [],
  total: 0,
  appliedSearch: "",
  appliedFilters: [],
  filteredProducts: [],
  appliedSortMethod: "",
};

function mealsReducer(state = initialState, action) {
  if (action.type === "DATA_LOADED") {
    return Object.assign({}, state, {
      meals: action.meals,
      filteredProducts: action.meals,
    });
  } else if (action.type === "ADD_TO_CART") {
    let addedMeal = state.filteredProducts.find(
      (meal) => meal.meal_id === action.id
    );
    let existed_meal = state.cart.find((meal) => action.id === meal.meal_id);

    if (!("quantity" in addedMeal)) {
      addedMeal.quantity = 1;
    }

    if (!("totalPrice" in addedMeal)) {
      addedMeal.totalPrice = parseInt(addedMeal.price) * addedMeal.quantity;
    }

    if (typeof existed_meal != "undefined") {
      existed_meal.quantity += addedMeal.quantity;
      existed_meal.totalPrice =
        existed_meal.quantity * parseInt(addedMeal.price);

      return {
        ...state,
        total: state.total + parseInt(addedMeal.totalPrice),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, JSON.parse(JSON.stringify(addedMeal))],
        total: state.total + parseInt(addedMeal.totalPrice),
      };
    }
  } else if (action.type === "ADD_QUANTITY") {
    let newMeals = [...state.filteredProducts];
    let foundItem = state.filteredProducts.find(
      (meal) => meal.meal_id === action.id
    );
    let foundId = state.filteredProducts.findIndex(
      (meal) => meal.meal_id === action.id
    );

    if (!("quantity" in foundItem)) {
      foundItem.quantity = 1;
    }
    if (!("totalPrice" in foundItem)) {
      foundItem.totalPrice = parseInt(foundItem.price);
    }
    foundItem.totalPrice = parseInt(foundItem.totalPrice);
    if (foundItem.quantity < 1) {
      foundItem.quantity = 1;
    } else if (foundItem.quantity >= 1) {
      foundItem.quantity += 1;
      foundItem.totalPrice += parseInt(foundItem.price);
    }

    newMeals[foundId] = foundItem;
    return {
      ...state,
      filteredProducts: newMeals,
    };
  } else if (action.type === "SUB_QUANTITY") {
    let newMeals = [...state.filteredProducts];
    let foundItem = state.filteredProducts.find(
      (meal) => meal.meal_id === action.id
    );
    let foundId = state.filteredProducts.findIndex(
      (meal) => meal.meal_id === action.id
    );

    if (!("quantity" in foundItem)) {
      foundItem.quantity = 1;
    }
    if (!("totalPrice" in foundItem)) {
      foundItem.totalPrice = parseInt(foundItem.price);
    }
    foundItem.totalPrice = parseInt(foundItem.totalPrice);
    if (foundItem.quantity === 1) {
      foundItem.quantity = 1;
      foundItem.totalPrice = parseInt(foundItem.price);
    } else if (foundItem.quantity >= 1) {
      foundItem.quantity -= 1;
      foundItem.totalPrice -= parseInt(foundItem.price);
    }

    newMeals[foundId] = foundItem;
    return {
      ...state,
      filteredProducts: newMeals,
    };
  } else if (action.type === "CART_ADD_QUANTITY") {
    let newCart = [...state.cart];
    let foundItem = state.cart.find((meal) => meal.meal_id === action.id);
    let foundId = state.cart.findIndex((meal) => meal.meal_id === action.id);

    foundItem.totalPrice = parseInt(foundItem.totalPrice);
    if (foundItem.quantity < 1) {
      foundItem.quantity = 1;
    } else if (foundItem.quantity >= 1) {
      foundItem.quantity += 1;
      foundItem.totalPrice += parseInt(foundItem.price);
    }

    newCart[foundId] = foundItem;
    return {
      ...state,
      cart: newCart,
      total: state.total + parseInt(foundItem.price),
    };
  } else if (action.type === "CART_SUB_QUANTITY") {
    let newCart = [...state.cart];
    let foundItem = state.cart.find((meal) => meal.meal_id === action.id);
    let foundId = state.cart.findIndex((meal) => meal.meal_id === action.id);
    let totalCheck = false;

    if (!("quantity" in foundItem)) {
      foundItem.quantity = 1;
    }
    if (!("totalPrice" in foundItem)) {
      foundItem.totalPrice = parseInt(foundItem.price);
    }
    foundItem.totalPrice = parseInt(foundItem.totalPrice);
    if (foundItem.quantity <= 1) {
      totalCheck = true;
    }
    if (foundItem.quantity === 1) {
      foundItem.quantity = 1;
      foundItem.totalPrice = parseInt(foundItem.price);
    } else if (foundItem.quantity >= 1) {
      foundItem.quantity -= 1;
      foundItem.totalPrice -= parseInt(foundItem.price);
    }

    newCart[foundId] = foundItem;
    return {
      ...state,
      cart: newCart,
      total: totalCheck ? state.total : state.total - parseInt(foundItem.price),
    };
  } else if (action.type === "CART_REMOVE_MEAL") {
    let mealToRemove = state.cart.find((meal) => meal.meal_id === action.id);
    let newCart = state.cart.filter((meal) => action.id !== meal.meal_id);

    let newTotal = state.total - parseInt(mealToRemove.totalPrice);
    return {
      ...state,
      cart: newCart,
      total: newTotal,
    };
  } else if (action.type === "MEALS_FILTER_SEARCH") {
    let newState = Object.assign({}, state);
    let value = action.value.toLowerCase();
    newState.appliedSearch = value;
    if (state.appliedFilters.length !== 0) {
      newState.filteredProducts = state.meals.filter(
        (meal) =>
          meal.name.toLowerCase().includes(value) &&
          state.appliedFilters.includes(meal.type.toLowerCase())
      );
    } else {
      newState.filteredProducts = state.meals.filter((meal) =>
        meal.name.toLowerCase().includes(value)
      );
    }

    if (state.appliedSortMethod.length !== 0) {
      let sortFilter = state.appliedSortMethod;
      if (sortFilter === "Sort by popularity") {
        newState.filteredProducts.sort((a, b) => a.orders - b.orders);
      } else if (sortFilter === "Sort by price: high to low") {
        newState.filteredProducts.sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        );
      } else if (sortFilter === "Sort by price: low to high") {
        newState.filteredProducts.sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
      } else {
        newState.filteredProducts.sort((a, b) => a.meal_id - b.meal_id);
      }
    }

    return newState;
  } else if (action.type === "MEALS_FILTER_CATEGORY_ADD") {
    let newState = Object.assign({}, state);
    let value = action.value;
    newState.appliedFilters.push(value.toLowerCase());

    if (state.appliedSearch.length !== 0) {
      newState.filteredProducts = state.meals.filter(
        (meal) =>
          meal.name.toLowerCase().includes(state.appliedSearch) &&
          state.appliedFilters.includes(meal.type.toLowerCase())
      );
    } else {
      newState.filteredProducts = state.meals.filter((meal) =>
        state.appliedFilters.includes(meal.type.toLowerCase())
      );
    }

    if (state.appliedSortMethod.length !== 0) {
      let sortFilter = state.appliedSortMethod;
      if (sortFilter === "Sort by popularity") {
        newState.filteredProducts.sort((a, b) => a.orders - b.orders);
      } else if (sortFilter === "Sort by price: high to low") {
        newState.filteredProducts.sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        );
      } else if (sortFilter === "Sort by price: low to high") {
        newState.filteredProducts.sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
      } else {
        newState.filteredProducts.sort((a, b) => a.meal_id - b.meal_id);
      }
    }

    return newState;
  } else if (action.type === "MEALS_FILTER_CATEGORY_REMOVE") {
    let newState = Object.assign({}, state);
    let value = action.value.toLowerCase();

    newState.appliedFilters.splice(newState.appliedFilters.indexOf(value), 1);

    if (state.appliedFilters.length === 0) {
      if (state.appliedSearch.length !== 0) {
        newState.filteredProducts = state.meals.filter((meal) =>
          meal.name.toLowerCase().includes(state.appliedSearch)
        );
      } else {
        newState.filteredProducts = state.meals; // BAGA
      }
    } else if (state.appliedSearch.length !== 0) {
      newState.filteredProducts = state.meals.filter(
        (meal) =>
          meal.name.toLowerCase().includes(state.appliedSearch) &&
          state.appliedFilters.includes(meal.type.toLowerCase())
      );
    } else {
      newState.filteredProducts = state.meals.filter((meal) =>
        state.appliedFilters.includes(meal.type.toLowerCase())
      );
    }

    if (state.appliedSortMethod.length !== 0) {
      let sortFilter = state.appliedSortMethod;
      if (sortFilter === "Sort by popularity") {
        newState.filteredProducts.sort((a, b) => a.orders - b.orders);
      } else if (sortFilter === "Sort by price: high to low") {
        newState.filteredProducts.sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        );
      } else if (sortFilter === "Sort by price: low to high") {
        newState.filteredProducts.sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
      } else {
        newState.filteredProducts.sort((a, b) => a.meal_id - b.meal_id);
      }
    }

    return newState;
  } else if (action.type === "SORT_MEALS") {
    let newState = JSON.parse(JSON.stringify(state));
    let sortFilter = action.sortFilter;
    newState.appliedSortMethod = sortFilter;

    if (sortFilter === "Sort by popularity") {
      newState.filteredProducts.sort((a, b) => b.orders - a.orders);
    } else if (sortFilter === "Sort by price: high to low") {
      newState.filteredProducts.sort(
        (a, b) => parseInt(b.price) - parseInt(a.price)
      );
    } else if (sortFilter === "Sort by price: low to high") {
      newState.filteredProducts.sort(
        (a, b) => parseInt(a.price) - parseInt(b.price)
      );
    } else {
      newState.filteredProducts.sort((a, b) => a.meal_id - b.meal_id);
    }
    return newState;
  } else if (action.type === "CART_ORDER_SUBMIT") {
    let newState = JSON.parse(JSON.stringify(state));
    newState.cart = [];
    newState.total = 0;

    return newState;
  } else {
    return state;
  }
}

export default mealsReducer;
