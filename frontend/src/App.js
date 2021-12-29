import "./App.css";
import Header from "./components/layout/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import WebFont from "webfontloader";
import React from "react";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignup from "./components/user/LoginSignup";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
  }, []);
  return (
    <div className="App">
      <Router>
        {/* <Route path="/" element={<Header/>}></Route> */}

        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/login" element={<LoginSignup />}></Route>
        </Routes>
        {/* <Route path="/" element={<Footer />}></Route> */}
        {/* <Home/> */}

        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
