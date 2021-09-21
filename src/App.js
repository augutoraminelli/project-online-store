import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
          <Route
            path="/product-details/:tilte/:price/:thumbnail"
            component={ ProductDetails }
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
