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
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/layout/header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Router>
        {/* <Route path="/" element={<Header/>}></Route> */}

        <Header></Header>
        {isAuthenticated && <UserOptions user={user}></UserOptions>}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>

          <Route
            path="/account"
            element={
              // <ProtectedRoute>
              <Profile />
              // </ProtectedRoute>
            }
          ></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/me/update" element={<UpdateProfile />}></Route>
          <Route path="/password/update" element={<UpdatePassword />}></Route>
          <Route path="/password/forgot" element={<ForgotPassword />}></Route>
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          ></Route>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
        {/* <Route path="/" element={<Footer />}></Route> */}
        {/* <Home/> */}

        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
