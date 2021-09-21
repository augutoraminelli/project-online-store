import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../Components/Categories';
import CardList from '../Components/CardList';

class Home extends Component {
  constructor() {
    super();
    this.setSearch = this.setSearch.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleListOfCartProducts = this.handleListOfCartProducts.bind(this);

  //  this.props && const { location: { state: { listOfCartProducts } } } = this.props;
    this.state = {
      isLoaded: false,
      arrayCategories: [],
      productSearch: '',
      productList: [],
      category: '',
      listOfCartProducts: this.props.location.state.listOfCartProducts || [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((response) => this.setState({ isLoaded: true, arrayCategories: response }));
  }

  handleListOfCartProducts(newProductToCart) {
    const { listOfCartProducts } = this.state;
    this.setState({ listOfCartProducts: [...listOfCartProducts, newProductToCart] });
  }

  handleCategorySelected({ target: { value } }) {
    const { productSearch } = this.state;
    getProductsFromCategoryAndQuery(value, productSearch)
      .then((response) => this.setState({
        productList: response.results, category: value,
      }));
  }

  setSearch(event) {
    const { category } = this.state;
    const { value } = event.target;
    this.setState({ productSearch: value });
    getProductsFromCategoryAndQuery(category, value)
      .then((response) => this.setState({ productList: response.results }));
  }

  render() {
    const {
      isLoaded, arrayCategories, productSearch, productList, listOfCartProducts,
    } = this.state;
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
          <Link
            to={ {
              pathname: '/cart',
              state: { listOfCartProducts },
            } }
            data-testid="shopping-cart-button"
          >
            <img alt="cart" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-cart-grocery-flatart-icons-lineal-color-flatarticons.png" />
          </Link>
        </div>
        <div>
          {isLoaded && <Categories
            handleCategorySelected={ this.handleCategorySelected }
            arrayCategories={ arrayCategories }
          />}
        </div>
        <div data-testid="query-button">
          <CardList
            listOfCartProducts={ listOfCartProducts }
            handleListOfCartProducts={ this.handleListOfCartProducts }
            productList={ productList }
          />
        </div>
      </div>
    );
  }
}

export default Home;
