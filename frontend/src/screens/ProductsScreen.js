import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";


import LoadingIndicator from '../components/UI/LoadingIndicator';
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";

const ProductsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInstock, setCountInstock] = useState("");
  const [description, setDescription] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);

  const {
    loading: loadingDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete, dispatch]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInstock(product.countInstock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('_id', id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('countInstock',  countInstock);
    formData.append('description',  description);
    dispatch(
      saveProduct(formData)
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        {modalVisible ? null : <h3>Products</h3>}
        {modalVisible ? null : (
          <button className="button primary" onClick={() => openModal({})}>
            Create Product
          </button>
        )}
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>{id ? "Update Product" : "Create Product"}</h2>
              </li>
              <li>
                {loadingSave && <LoadingIndicator />}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>

              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInstock"
                  id="countInstock"
                  onChange={(e) => setCountInstock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      {loading ? <div>Loading...</div> : null}
      {products ? (
        <div className="product-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                    {loadingDelete ? <div>Loading....</div> : null}
                    <button className="button">
                      <Link to={"/product/" + product._id}>Details</Link>
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div> No Products</div>
      )}
    </div>
  );
};
export default ProductsScreen;
