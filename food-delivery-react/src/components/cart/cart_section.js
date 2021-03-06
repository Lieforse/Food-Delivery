import React from "react";
import { connect } from "react-redux";
import {
  cartAddMealQuantity,
  cartSubMealQuantity,
  removeMealFromCart,
  cartOrderSubmit,
} from "../../actions/mealsActions";

class CartSection extends React.Component {
  cartAddQuantity = (id) => {
    this.props.cartAddMealQuantity(id);
  };

  cartSubQuantity = (id) => {
    this.props.cartSubMealQuantity(id);
  };

  cartMealRemove = (id) => {
    this.props.removeMealFromCart(id);
  };

  orderSubmit = () => {
    if (this.props.cart.length === 0) {
      return false;
    } else {
      let btn = document.getElementById("button-js");
      if (btn.value === "Confirm order") {
        btn.value = "Confirmed";
        this.props.cartOrderSubmit(this.props.cart);
      } else {
        btn.value = "Confirm order";
      }
    }
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
                    <img src={cartItem.image} alt="" />
                    <h6>{cartItem.name}</h6>
                  </div>
                  <div className="col col-1 price">{cartItem.price}$</div>
                  <div className="col amount">
                    <div className="input-container">
                      <div
                        className="button minus"
                        tabIndex="0"
                        onClick={() => this.cartSubQuantity(cartItem.meal_id)}
                      ></div>
                      <input
                        type="text"
                        value={cartItem.quantity || 1}
                        maxLength="2"
                        className="counter"
                        placeholder="0"
                        readOnly
                      />
                      <div
                        className="button plus"
                        tabIndex="0"
                        onClick={() => this.cartAddQuantity(cartItem.meal_id)}
                      ></div>
                    </div>
                  </div>
                  <div className="col col-1 total">{cartItem.totalPrice}$</div>
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
                    id="button-js"
                    value="Confirm order"
                    onClick={() => this.orderSubmit()}
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
    cartOrderSubmit: (cart) => {
      dispatch(cartOrderSubmit(cart));
    },
  };
};

export default connect(null, mapDispatchToProps)(CartSection);
