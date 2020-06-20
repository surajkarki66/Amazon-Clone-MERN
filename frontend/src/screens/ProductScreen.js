import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { detailsProduct } from "../actions/productActions";

const ProductScreen = (props) => {
  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      // cleanup
    };
  }, [dispatch, props.match.params.id]);
  const { product, loading, error } = productDetails;
  let detail = null;
  if (loading) {
    detail = <div> Loading...</div>;
  }
  if (error) {
    detail = <div>{error}</div>
  }
  if (!loading && !error) {
    detail = (
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product"></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>${product.price}</b>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.status}</li>
            <li>
              Qty:{" "}
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </li>
            <li>
              <button className="button primary">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      { detail }
    </div>
  );
};

export default ProductScreen;
