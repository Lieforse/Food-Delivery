/* import React from "react";

class FoodContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      postsPerPage: 6,
      currentPage: 1,
    };
    this.mealChangeCounter = this.mealChangeCounter.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.sortMeals = this.sortMeals.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.getMeals();
    this.sortMeals();
  }

  getMeals = () => {
    fetch("http://192.168.0.107:4001/meal/select")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ meals: response });
      })
      .catch((err) => console.log(err));
  };

  sortMeals = () => {
    const indexOfLastPost =
      (this.state.currentPage + this.state.postsPerPage - 1) *
      this.state.currentPage;
    const indexOfFistPost =
      (this.state.currentPage - 1) * this.state.postsPerPage;
    const currentPosts = this.state.meals.slice(
      indexOfFistPost,
      indexOfLastPost
    );
    let arr = [];

    if (this.state.meals[0] === undefined) {
      return false;
    } else {
      console.log(currentPosts);
      arr = currentPosts.map((post) => (
        <div className="col-auto" key={post.meal_id}>
          <div className="card">
            <img src="/images/images/food/food1.jpg" alt="" />
            <div className="card-body">
              <h5 className="card-title">{post.name}</h5>
              <p className="card-text">{post.components}</p>
            </div>
            <form
              className="add-container"
              onSubmit={() => this.addToCart(post.meal_id)}
            >
              <p className="price">{post.totalPrice || post.price}</p>
              <div className="input-container">
                <input
                  type="button"
                  className="button minus"
                  value="-"
                  onClick={() => this.mealChangeCounter(post.meal_id, false)}
                />
                <input
                  type="text"
                  value={post.quantity || 1}
                  maxLength="2"
                  className="counter"
                  placeholder="0"
                  readOnly
                />
                <input
                  type="button"
                  className="button plus"
                  value="+"
                  onClick={() => this.mealChangeCounter(post.meal_id, true)}
                />
              </div>
              <input
                type="submit"
                className="button-submit"
                value="Add to cart"
              />
            </form>
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
      i <= Math.ceil(this.state.meals.length / this.state.postsPerPage);
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
  };

  mealChangeCounter = (id, isPlus) => {
    let newMeals = [...this.state.meals];
    let foundItem = this.state.meals.find((meal) => meal.meal_id === id);
    let foundId = this.state.meals.findIndex((meal) => meal.meal_id === id);

    this.priceMultiplier = (isPlus) => {
      if (!("totalPrice" in foundItem)) {
        foundItem.totalPrice = parseInt(foundItem.price);
      }
      foundItem.totalPrice = parseInt(foundItem.totalPrice);
      if (isPlus) {
        console.log(parseInt(foundItem.price));
        foundItem.totalPrice += parseInt(foundItem.price);
        console.log(foundItem.totalPrice);
      } else {
        foundItem.totalPrice -= parseInt(foundItem.price);
      }

      foundItem.totalPrice += "$";
      return foundItem.totalPrice;
    };

    if (!("quantity" in foundItem)) {
      foundItem.quantity = 1;
    }
    if (foundItem.quantity >= 1) {
      if (isPlus) {
        foundItem.quantity += 1;
        this.priceMultiplier(isPlus);
      } else {
        if (foundItem.quantity === 1) {
          foundItem.quantity = 1;
        } else {
          foundItem.quantity -= 1;
          this.priceMultiplier(isPlus);
        }
      }
    }

    newMeals[foundId] = foundItem;

    this.setState({ meals: newMeals });
  };

  addToCart = (id) => {
    let cart = [];
    let foundItem = this.state.meals.find((meal) => meal.meal_id === id);
    if (!("quantity" && "totalPrice" in foundItem)) {
      foundItem.quantity = 1;
      foundItem.totalPrice = foundItem.price;
    }

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push(this.state.meals.find((meal) => meal.meal_id === id));

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  render() {
    return (
      <div className="food-content-section">
        <div className="row">{this.sortMeals()}</div>
        {this.pagination()}
      </div>
    );
  }
}

export default FoodContent;
 */
