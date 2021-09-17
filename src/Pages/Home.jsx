import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <form method="get">
          <input type="text" placeholder="Digite seu texto aqui." />
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </form>
        <div>
          <Link to="/cart" data-testid="shopping-cart-button"><img alt="cart" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-cart-grocery-flatart-icons-lineal-color-flatarticons.png" /></Link>
        </div>
      </div>
    );
  }
}

export default Home;
