import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import "./search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
    //   history.push(`/products/${keyword}`);
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE"></MetaData>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        ></input>
        <input type="submit" value="Search"></input>
      </form>
    </Fragment>
    //       )}
    //     </Fragment>
  );
};

export default Search;
