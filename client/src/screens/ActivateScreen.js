import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { activation } from "../actions/userActions";

import LoadingIndicator from '../components/UI/LoadingIndicator';

const Activate = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    token: "",
    show: true,
  });
  const userActivation = useSelector((state) => state.userActivation);
  const dispatch = useDispatch();
  const { loading, data } = userActivation;

  useEffect(() => {
    let token = props.match.params.token;
    let { firstName, lastName } = jwt.decode(token);
    if (token) {
      setFormData({ ...formData, firstName, lastName, token });
    }
    // eslint-disable-next-line
  }, []);
  const { firstName, lastName, token } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(activation(token));
    setFormData({
      ...formData,
      firstName: "",
      lastName: "",
      token: ""
    });
  };

  return (
    <div className="form">
      {data ? <Redirect to="/signin?redirect=shipping" /> : null}
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2 style={{ textAlign: "center" }}>Welcome {firstName} {lastName}</h2>
            <h3 style={{ textAlign: "center" }}>Activate Your Account...</h3>
          </li>
          <li>{loading && <h1 style={{textAlign:'center'}}><LoadingIndicator /></h1>}</li>

          <li>
            <button type="submit" className="button primary">
              Activate
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Activate;
