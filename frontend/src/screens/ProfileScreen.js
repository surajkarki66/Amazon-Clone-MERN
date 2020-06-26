import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };
  const userUpdate = useSelector((state) => state.profileUpdate);
  const { loading, data, error } = userUpdate;
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
    if (error) {
      toast.error(error.response.data.message);
    }
    if (data) {
      toast.success(data.message);
    }

    dispatch(listMyOrders());
    return () => {};
  }, [userInfo, data, error, dispatch]);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2 style={{ textAlign: "center" }}>Update User Profile</h2>
              </li>
              <li>{loading && <div>Loading...</div>}</li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>

              <li>
                <button type="submit" className="button primary">
                  Update
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">
        <h2 style={{ textAlign: "center" }}>My Orders</h2>
        {loadingOrders ? (
          <div>Loading...</div>
        ) : errorOrders ? (
          <div>{errorOrders} </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link to={"/order/" + order._id}>DETAILS</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <ul className="form-container">
          <h2 style={{ textAlign: "center" }}>Profile</h2>
          <label
            htmlFor="name"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            Name: {name}{" "}
          </label>
          <br />
          <label
            htmlFor="email"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            Email: {email}{" "}
          </label>

          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="button secondary logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileScreen;
