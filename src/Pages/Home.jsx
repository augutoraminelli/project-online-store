import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../Components/Categories';
import CardList from '../Components/CardList';
import numberItens from '../services/numberItens';
import ShoppingCart from '../Components/ShoppingCart';

class Home extends Component {
  constructor() {
    super();
    this.setSearch = this.setSearch.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleListOfCartProducts = this.handleListOfCartProducts.bind(this);
    this.setStateOfListOfCartProducts = this.setStateOfListOfCartProducts.bind(this);
    this.changeTotalItensOfCart = this.changeTotalItensOfCart.bind(this);

    this.state = {
      isLoaded: false,
      arrayCategories: [],
      productSearch: '',
      productList: [],
      category: '',
      listOfCartProducts: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((response) => this.setState({ isLoaded: true, arrayCategories: response }));
    const { location: { state } } = this.props;
    if (state) this.setStateOfListOfCartProducts();
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

  setStateOfListOfCartProducts() {
    const { location: { state: { listOfCartProducts } } } = this.props;
    this.setState({ listOfCartProducts });
  }

  setSearch(event) {
    const { category } = this.state;
    const { value } = event.target;
    this.setState({ productSearch: value });
    getProductsFromCategoryAndQuery(category, value)
      .then((response) => this.setState({ productList: response.results }));
  }

  changeTotalItensOfCart() {
    this.setState({ totalItensOfCart: numberItens() });
  }

  render() {
    const {
      isLoaded, arrayCategories,
      productSearch, productList, listOfCartProducts, totalItensOfCart,
    } = this.state;
    return (
      <main className="flex ml-10 mt-5 mb-10 mr-10 justify-between">
        <div className=" bg-white px-6 py-4 rounded h-fit shadow shadow-2xl max-w-xs">
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Digite seu texto aqui. "
              className="shadow appearance-none border rounded  py-2
            px-3 text-gray-700 leading-tight focus:outline-none
            focus:shadow-outline font-sans italic bg-slate-300"
              value={ productSearch }
              onChange={ this.setSearch }
            />
            <p className="text-xs text-gray-400 font-sans italic">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </div>
          <div className="mt-10">
            {isLoaded && <Categories
              handleCategorySelected={ this.handleCategorySelected }
              arrayCategories={ arrayCategories }
            />}
          </div>
        </div>
        <div className="p-10 mr-20">
          <CardList
            changeTotalItensOfCart={ this.changeTotalItensOfCart }
            listOfCartProducts={ listOfCartProducts }
            handleListOfCartProducts={ this.handleListOfCartProducts }
            productList={ productList }
          />
        </div>
        <div className="ml-10">
          <Link
            to={ {
              pathname: '/cart',
              state: { listOfCartProducts },
            } }
          >
            <ShoppingCart NumberOfItens={ totalItensOfCart } />
          </Link>
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
