import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Header from './components/header/header';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './containers/AboutUs/AboutUs';
import NotFound from './containers/NotFound/NotFound';
import Catalog from './containers/Catalog/Catalog';
import Profile from './containers/Profile/Profile';
import Cart from './containers/Cart/Cart';
import TestKeeb from './containers/TestKeeb/TestKeeb';


const routing = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <Routes>
          <Route path="*" element={<NotFound/>} />
          <Route path="/" element={<App/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Catalog" element={<Catalog/>} />
          <Route path="/testkeeb" element={<TestKeeb/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/Cart" element={<Cart/>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode> 
);

ReactDOM.render( routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
