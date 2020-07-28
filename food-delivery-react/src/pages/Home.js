import React from "react";
import { connect } from "react-redux";
import { mealsFetchData } from "../components/actions/mealsActions";
import { Intro } from "../components/home/intro";
import SecondSection from "../components/home/second_section";
import { ThirdSection } from "../components/home/third_section";
import { FourthSection } from "../components/home/fourth_section";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.scrollF = this.scrollF.bind(this);
  }

  render() {
    return (
      <div className="wrapper home-wrapper">
        <Intro />
        <SecondSection meals={this.props.meals} />
        <ThirdSection />
        <FourthSection />
      </div>
    );
  }

  scrollF = () => {
    let scrollpos = window.scrollY;
    let header = document.querySelector("#navbar-js");
    function addClassOnScroll() {
      header.classList.add("active");
    }

    function removeClassOnScroll() {
      header.classList.remove("active");
    }
    scrollpos = window.scrollY;

    if (
      document.querySelector(".small-navbar-js").classList.contains("active")
    ) {
      header.classList.add("active");
    } else {
      if (scrollpos > 50) {
        addClassOnScroll();
      } else {
        removeClassOnScroll();
      }
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollF);
    this.props.fetchData();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollF);
  }
}

const mapStateToProps = (state) => {
  return {
    meals: state.mealsReducer.meals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(mealsFetchData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
