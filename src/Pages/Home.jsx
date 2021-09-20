import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Categories from '../Components/Categories';
import CardList from '../Components/CardList';

class Home extends Component {
  constructor() {
    super();

    this.setSearch = this.setSearch.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);

    this.state = {
      isLoaded: false,
      arrayCategories: [],
      productSearch: '',
      categorySelected: '',
    };
  }

  componentDidMount() {
    getCategories()
      .then((response) => this.setState({ isLoaded: true, arrayCategories: response }));
  }

  handleCategorySelected({ target: { value } }) {
    this.setState({ categorySelected: value });
  }

  setSearch(event) {
    const { value } = event.target;
    this.setState({ productSearch: value });
  }

  render() {
    const { isLoaded, arrayCategories, productSearch, categorySelected } = this.state;
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
        <div>
          {isLoaded && <Categories
            handleCategorySelected={ this.handleCategorySelected }
            arrayCategories={ arrayCategories }
          />}
        </div>
        <div data-testid="query-button">
          {isLoaded && <CardList
            categorySelected={ categorySelected }
            productSearch={ productSearch }
          />}
        </div>
      </div>
    );
  }
}

export default Home;
