import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingIndicator from '../components/UI/LoadingIndicator';
import { logout } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  let allOrders = null;
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
    }
    
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo, dispatch]);

  if (loadingOrders) {
    allOrders = <h1 style={{textAlign: 'center'}}><LoadingIndicator /></h1>;
  }
  if (errorOrders) {
    allOrders = <div>{errorOrders}</div>;
  }
  if (!loadingOrders) {
    allOrders = (
      <React.Fragment>
        <h2 style={{ textAlign: "center" }}>My Orders</h2>
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
      </React.Fragment>
    );
    
  }

  return (
    <div className="profile">
      <div className="profile-orders content-margined">
        <ul className="form-container" style={{ marginLeft: "470px" }}>
          <h2 style={{ textAlign: "center" }}>Profile</h2>
          <label
            htmlFor="name"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            First Name: {firstName}{" "}
          </label>
          <br />
          <label
            htmlFor="name"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            Last Name: {lastName}{" "}
          </label>
          <br />
          <label
            htmlFor="email"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            Email: {email}{" "}
          </label>

          {userInfo.isActive ? (
            <h3>Account Activated</h3>
          ) : (
            <Link to="/">
              <h3>Activate your account.</h3>
            </Link>
          )}

          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="button secondary logout"
            >
              Logout
            </button>
          </li>
          <li>
            <Link to="/user/update/">Update Profile</Link>
          </li>
        </ul>

        {allOrders}
      </div>
    </div>
  );
};

export default ProfileScreen;
