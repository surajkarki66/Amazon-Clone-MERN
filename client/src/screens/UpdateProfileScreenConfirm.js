import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { updateConfirmation } from '../actions/userActions';

const UpdateProfileScreenConfirm = (props) => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = props.match.params.token;
        dispatch(updateConfirmation(token));
    }
    const profileUpdateConfirm = useSelector((state) => state.profileUpdateConfirm);
    const {loading, data, error} = profileUpdateConfirm;
    return (
        <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h3 style={{ textAlign: "center" }}>Profile Updation Confirm...</h3>
          </li>
          <li>
            <button type="submit" className="button primary">
              Activate
            </button>
          </li>
          <li>{loading && <div>Loading...</div>}</li>
          <li>{data && <div>{data.error}</div>}</li>
          <li>{error && <div>{error}</div>}</li>

        </ul>
      </form>
    </div>
    )
};

export default UpdateProfileScreenConfirm;