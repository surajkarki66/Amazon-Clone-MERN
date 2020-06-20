import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { listProducts } from "../actions/productActions";

const HomeScreen = (props) => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  let product = null;
  if (error) {
    product = <div>{error}</div>;
  }

  if (loading) {
    product = <div>Loading...</div>;
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
                  src={product.image}
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
  return <React.Fragment>{product}</React.Fragment>;
};

export default HomeScreen;
