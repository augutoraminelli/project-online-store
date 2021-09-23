import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Checkout from './Components/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
          <Route
            path="/product-details/:id"
            component={ ProductDetails }
          />
          <Route path="/checkout" component={ Checkout } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
