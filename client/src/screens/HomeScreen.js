import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { listProducts } from "../actions/productActions";
import LoadingIndicator from '../components/UI/LoadingIndicator';

const HomeScreen = (props) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.category
    ? props.match.params.category
    : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchKeyword === inputRef.current.value) {
        dispatch(listProducts(category, searchKeyword));
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, category, searchKeyword, inputRef]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  let product = null;
  if (error) {
    product = <div>{error}</div>;
  }

  if (loading) {
    product = <h1 style={{textAlign:'center'}}><LoadingIndicator /></h1>;
  }
  if (!error && !loading) {
    product = (
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <Link to={"/product/" + product._id}>
                {" "}
                <img
                  className="product-image"
                  src={"http://localhost:5000/" + product.image}
                  alt="product"
                />
              </Link>

              <div className="product-name">
                <Link to={"/product/" + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.rating} Stars (10 Reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <React.Fragment>
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              ref={inputRef}
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {category && <h2 style={{ textAlign: "center" }}>{category}</h2>}
      {product}
    </React.Fragment>
  );
};

export default HomeScreen;
