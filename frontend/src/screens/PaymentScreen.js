import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const cart = useSelector(state => state.cart);
  const { shipping } = cart;

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (Object.entries(shipping).length===0) {
      props.history.push('/shipping');
    }
  }, [props.history, shipping]);

  const submitHandler = (e) => {
    e.preventDefault();
    if ((paymentMethod.length !== 0)) {
      dispatch(savePayment({ paymentMethod }));
      props.history.push("placeorder");
    } else {
      toast.error("Please check the payment method !");
    }
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
              <div>
              <br/>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="cash on delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">Cash On Delivery</label>
              </div>
              <div>
              <br />
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="creditcard"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">CreditCard</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};
export default PaymentScreen;
