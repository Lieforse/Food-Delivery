import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Food from "./pages/Food";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import ScrollToTop from "./components/scripts/ScrollToTop";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/food"} exact component={Food} />
            <Route path={"/blog"} exact component={Blog} />
            <Route path={"/cart"} exact component={Cart} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
