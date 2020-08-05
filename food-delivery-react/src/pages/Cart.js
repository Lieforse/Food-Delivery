import React from "react";
import { connect } from "react-redux";
import { MiniNav } from "../components/cart/mini_nav";
import CartSection from "../components/cart/cart_section";

class Cart extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MiniNav />
        <CartSection cart={this.props.cart} total={this.props.total} />
      </div>
    );
  }

  componentDidMount() {
    document.querySelector("#navbar-js").classList.add("active");
  }
  componentWillUnmount() {
    document.querySelector("#navbar-js").classList.remove("active");
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.mealsReducer.cart,
    total: state.mealsReducer.total,
  };
};

export default connect(mapStateToProps)(Cart);
