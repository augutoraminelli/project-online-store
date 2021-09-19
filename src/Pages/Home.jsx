import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardList from '../Components/CardList';

class Home extends Component {
  constructor() {
    super();

    this.setSearch = this.setSearch.bind(this);

    this.state = {
      productSearch: '',
    };
  }

  setSearch(event) {
    const { value } = event.target;
    this.setState({ productSearch: value });
  }

  render() {
    const { productSearch } = this.state;
    return (
      <div>
        <form method="get">
          <input
            type="text"
            placeholder="Digite seu texto aqui. "
            data-testid="query-input"
            value={ productSearch }
            onChange={ this.setSearch }
          />
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </form>
        <div>
          <Link to="/cart" data-testid="shopping-cart-button"><img alt="cart" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-cart-grocery-flatart-icons-lineal-color-flatarticons.png" /></Link>
        </div>
        <CardList productSearch={ productSearch } />
      </div>
    );
  }
}

export default Home;
