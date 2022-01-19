// import { Carousel } from "react-carousel-minimal";
import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/loader/Loader";
import "./ProductDetails.css";
import { clearError, getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
// import { Rating } from "@mui/material";
import ReviewCard from "./ReviewCard.js";
import { addItemsToCart } from "../../actions/cartActions";

// const App = () => {
//   const data = [
//     {
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
//       caption: "San Francisco",
//     },
//     {
//       image:
//         "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
//       caption: "Scotland",
//     },
//   ];
//   const captionStyle = {
//     fontSize: "2em",
//     fontWeight: "bold",
//   };
//   const slideNumberStyle = {
//     fontSize: "20px",
//     fontWeight: "bold",
//   };
// };
const ProductDetails = () => {
  // const state = store.getState();
  //   console.log(state);

  // const data = [
  //     {
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
  //       caption: "San Francisco",
  //     },
  //     {
  //       image:
  //         "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
  //       caption: "Scotland",
  //     },
  //   ];
  //   const captionStyle = {
  //     fontSize: "2em",
  //     fontWeight: "bold",
  //   };
  //   const slideNumberStyle = {
  //     fontSize: "20px",
  //     fontWeight: "bold",
  //   };

  const dispatch = useDispatch();

  const alert = useAlert();

  //   const params = useParams();

  //   let product = useSelector((state) => state.productDetails);
  //   const { name, loading, images, error } = product;
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  console.log(product);

  const { id } = useParams();
  console.log(id);

  // const options = {
  //   size: "large",
  //   value: product.ratings,
  //   readOnly: true,
  //   precision: 0.5
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, alert, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success('Item added successfully to cart')
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((images, i) => {
                    <img
                      className="CarouselImage"
                      key={images.url}
                      src={images.url}
                      alt={`${i} slide`}
                    />;
                  })}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>product # {id}</p>
              </div>
              <div className="detailsBlock-2">
                {/* <Rating {...options} /> */}
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler} disabled={product.stock < 1 ? true : false}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review}></ReviewCard>
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
