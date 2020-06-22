import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {
  const [shippingForm, setShippingForm] = useState({
      address: "",
      city: "",
      postalCode: "",
      country: ""
  });

  const dispatch = useDispatch();
  const { address, city, postalCode, country } = shippingForm;
  const handleChange = (text) => (e) => {
    setShippingForm({ ...shippingForm, [text]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps> 
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>

          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" value={address} onChange={handleChange('address')}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" value={city} onChange={handleChange('city')}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="number" name="postalCode" id="postalCode" value={postalCode} onChange={handleChange('postalCode')}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" value={country} onChange={handleChange('country')}>
            </input>
          </li>


          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;