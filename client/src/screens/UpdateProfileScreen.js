import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { update } from '../actions/userActions';

const UpdateProfileScreen = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.profileUpdate);
  const { loading, data, error } = userUpdate;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, firstName, lastName, password }))
  }

  return (
    <div className="profile-info">
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2 style={{textAlign: 'center'}}>Update Profile</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data && <Redirect to="/profile/" />}
          </li>
          <li>
            <label htmlFor="name">
              First Name
        </label>
            <input type="name" name="firstname" id="firstname" onChange={(e) => setFirstName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="name">
              Last Name
        </label>
            <input type="name" name="lastname" id="lastname" onChange={(e) => setLastName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="email">
              Email
        </label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
            </input>
          </li>

          <li>
            <button type="submit" className="button primary">Update</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
  )
};

export default UpdateProfileScreen;