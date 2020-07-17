import React from "react";
import { connect } from "react-redux";
import {
  cartAddMealQuantity,
  cartSubMealQuantity,
  removeMealFromCart,
} from "../actions/mealsActions";

class CartSection extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };

    this.mealChangeCounterv = this.mealChangeCounter.bind(this);
    this.orderItemRemove = this.orderItemRemove.bind(this);
  } */

  /* componentWillMount() {
    this.orderItemModel();
  } */

  /* orderItemModel = () => {
    let order_item = {};
    let lS = JSON.parse(localStorage.getItem("cart")).map((mealItem) => [
      mealItem,
      order_item,
    ]);
    this.setState({
      cart: lS,
    });
    console.log(lS);
  }; */

  /* mealChangeCounter = (id, isPlus) => {
    let newCart = [...this.state.cart];
    let foundItem = this.state.cart.find((meal) => meal.meal_id === id);
    let foundId = this.state.cart.findIndex((meal) => meal.meal_id === id);

    console.log(newCart);

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

    newCart[foundId] = foundItem;

    this.setState({ cart: newCart });
  };

  orderItemRemove = () => {}; */

  cartAddQuantity = (id) => {
    this.props.cartAddMealQuantity(id);
  };

  cartSubQuantity = (id) => {
    this.props.cartSubMealQuantity(id);
  };

  cartMealRemove = (id) => {
    this.props.removeMealFromCart(id);
  };

  render() {
    return (
      <div className="container">
        <div className="cart-section">
          <form className="cart-form">
            <div className="cart-head">
              <div className="row">
                <div className="col-7">Product</div>
                <div className="col col-1">Price</div>
                <div className="col">Amount</div>
                <div className="col col-1">Total</div>
              </div>
            </div>
            <div className="cart-body">
              {this.props.cart.map((cartItem) => (
                <div className="row" key={cartItem.meal_id}>
                  <div className="col-7 product">
                    <span
                      className="mdi mdi-close"
                      onClick={() => this.cartMealRemove(cartItem.meal_id)}
                    ></span>
                    <img
                      src="/images/images/second_section/specialities1.jpg"
                      alt=""
                    />
                    <h6>{cartItem.name}</h6>
                  </div>
                  <div className="col col-1 price">{cartItem.price}</div>
                  <div className="col amount">
                    <div className="input-container">
                      <input
                        type="button"
                        className="button"
                        value="-"
                        onClick={() => this.cartSubQuantity(cartItem.meal_id)}
                      />
                      <input
                        type="text"
                        value={cartItem.quantity}
                        maxLength="2"
                        className="counter"
                        placeholder="0"
                        readOnly
                      />
                      <input
                        type="button"
                        className="button"
                        value="+"
                        onClick={() => this.cartAddQuantity(cartItem.meal_id)}
                      />
                    </div>
                  </div>
                  <div className="col col-1 total">{cartItem.totalPrice}</div>
                </div>
              ))}
              <div className="cart-foot">
                <div className="summary">
                  <p>
                    Total: <span>{this.props.total}$</span>
                  </p>
                  <input
                    type="button"
                    className="button"
                    value="Confirm order"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cartAddMealQuantity: (id) => {
      dispatch(cartAddMealQuantity(id));
    },
    cartSubMealQuantity: (id) => {
      dispatch(cartSubMealQuantity(id));
    },
    removeMealFromCart: (id) => {
      dispatch(removeMealFromCart(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(CartSection);
