import React, { Fragment } from "react";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/loader/Loader";
import profilePng from "../../images/Profile.png";
import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
  const { loading } = useSelector((state) => state.productDetails);

//   console.log(review);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="reviewCard">
            <img src={profilePng} alt="User"></img>
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReviewCard;
