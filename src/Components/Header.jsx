import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        um botao para home e outro pro cart
        <Link to="/home"><img alt="home" src="https://img.icons8.com/material/48/000000/home--v5.png" /></Link>
        <Link to="/cart" data-testid="shopping-cart-button"><img alt="cart" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-cart-grocery-flatart-icons-lineal-color-flatarticons.png" /></Link>
      </div>
    );
  }
}

export default Header;
