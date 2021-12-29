import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearError, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

// const product = {
//   name: "asdfghjkl",
//   images: [
//     {
//       url: "https://assets.ajio.com/medias/sys_master/root/h60/h39/11495939899422/-473Wx593H-460076836-lightblue-MODEL.jpg",
//     },
//   ],
//   price: "4500",
//   _id: "Sneh",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let product = useSelector((state) => state.products);
  const { loading, products, error } = product;

  console.log(product);
  // const { loading, products, productsCount, error } = useSelector(
  //   (state) => state.products
  // );
  useEffect(() => {
    if (error) {
      console.log(error)
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
