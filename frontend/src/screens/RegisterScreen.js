import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
const RegisterScreen = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [newStage, setNewStage] = useState(false);

  const { name, email, password, rePassword } = formData;

  const [loading, setLoading] = useState(false);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      toast.error("Password does not matched !!");
    }
    if (password === rePassword) {
      try {
        setLoading(true);
        const name = formData.name;
        const email = formData.email;
        const response = await axios.post(
          "http://localhost:5000/api/register",
          {
            name,
            email,
            password,
          }
        );
        setLoading(false);
        const data = response.data;
        toast.success(data.message);
        setNewStage(true);
        console.log(data.activationLink);
      } catch (error) {
        toast.error(error.response.data.error);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const userInfo = Cookie.getJSON("userInfo") || null;
    if (userInfo) {
      props.history.push("/shipping");
    }
  }, []);
  let form = (
    <form onSubmit={submitHandler}>
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>{loading ? <div>Loading .....</div> : null}</li>
        <li>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            id="name"
            onChange={handleChange("name")}
            value={name}
          />
        </li>
        <li>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            id="email"
            value={email}
            onChange={handleChange("email")}
          />
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange("password")}
          />
        </li>
        <li>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input
            type="password"
            id="rePassword"
            placeholder="Confirm Password"
            name="rePassword"
            value={rePassword}
            onChange={handleChange("rePassword")}
          />
        </li>
        <li>
          <button type="submit" className="button primary">
            Register
          </button>
        </li>
        <li>
          Already have an account?
          <Link
            to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
            className="button secondary text-center"
          >
            Sign In
          </Link>
        </li>
      </ul>
    </form>
  );
  if (newStage) {
    form = (
      <div>
        <h3 style={{ textAlign: "center" }}>
          Check your email to activate your account..
        </h3>
      </div>
    );
  }
  return <div className="form">{form}</div>;
};
export default RegisterScreen;
