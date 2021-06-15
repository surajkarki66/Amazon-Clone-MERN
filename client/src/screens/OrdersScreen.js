import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import LoadingIndicator from '../components/UI/LoadingIndicator';
import { listOrders, deleteOrder } from "../actions/orderActions";

const OrdersScreen = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const userSignin = useSelector((state) => state.userSignin);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [
    successDelete,
    dispatch,
    errorDelete,
    props.history,
    userSignin.userInfo,
  ]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  let allOrders = null;
  if (loading) {
    allOrders = <h1 style={{textAlign:'center'}}><LoadingIndicator /></h1>;
  }
  if (error) {
    allOrders = <div>{error}</div>;
  }
  if (!loading) {
    if (orders !== undefined) {
      allOrders = (
        <div className="content content-margined">
          <div className="order-header">
            <h3>Orders</h3>
          </div>
          <div className="order-list">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>PAID</th>
                  <th>PAID AT</th>
                  <th>DELIVERED</th>
                  <th>DELIVERED AT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.user.firstName}</td>
                    <td>{order.user.lastName}</td>
                    <td>{order.user.email}</td>
                    <td>{order.isPaid.toString()}</td>
                    <td>{order.paidAt}</td>
                    <td>{order.isDelivered.toString()}</td>
                    <td>{order.deliveredAt}</td>
                    <td>
                      <Link
                        to={"/order/" + order._id}
                        className="button secondary"
                      >
                        Details
                      </Link>{" "}
                      <button
                        type="button"
                        onClick={() => deleteHandler(order)}
                        className="button secondary"
                      >
                        Delete
                      </button>
                      {loadingDelete ? <div>Loading....</div> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      allOrders = <h2>No Orders Available !!</h2>;
    }
  }

  return <React.Fragment>{allOrders}</React.Fragment>;
};

export default OrdersScreen;
