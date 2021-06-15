import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ActivationScreen from './screens/ActivateScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileUpdateScreen from './screens/UpdateProfileScreen';
import ProfileUpdateScreenConfirm from './screens/UpdateProfileScreenConfirm';
import ProductsScreen from './screens/ProductsScreen';

function App() {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  let firstLink =  <Link to="/signin">Sign In</Link>
  let secondLink = null;
  if (userInfo) {
    firstLink = <Link to="/profile">{userInfo.firstName} {userInfo.lastName}</Link>
    secondLink = null;
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
    <ToastContainer />
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/">Amazon-Clone</Link>
      </div>
      <div className="header-links">
        {firstLink}
        {secondLink}
        {userInfo && userInfo.role === 'admin' && (
              <div className="dropdown">
                <a href="/"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
          )}
      </div>
    </header>
    <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              <Link to="/category/computer">Computer</Link>
            </li>

            <li>
              <Link to="/category/mobile">Mobile</Link>
            </li>

            <li>
              <Link to="/category/fashion">Fashion</Link>
            </li>

          </ul>
        </aside>
    <main className="main">
      <div className="content">
      
      <Route path="/product/:id" component={ProductScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/signin" component={SignInScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/user/activate/:token" component={ActivationScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} /> 
      <Route path="/products" component={ProductsScreen} />
      <Route path="/orders" component={OrdersScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/user/update" component={ProfileUpdateScreen} />
      <Route path="/update/confirm/:token" component={ProfileUpdateScreenConfirm} />
      <Route path="/category/:category" component={HomeScreen} />
      <Route path="/" exact={true} component={HomeScreen} />
     
      

      </div>

    </main>
    <footer className="footer">
      All right reserved.
    </footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
