import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeScreen = (props) => {
  const [ products, setProducts ] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };
    fetchData();
  }, []);   
  return (
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
};

export default HomeScreen;
