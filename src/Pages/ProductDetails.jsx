import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.setListOfCartProducts = this.setListOfCartProducts.bind(this);

    const { location: { state: { product, listOfCartProducts } } } = props;
    this.state = {
      product,
      listOfCartProducts,
    };
  }

  setListOfCartProducts() {
    const { product, listOfCartProducts } = this.state;
    this.setState({ listOfCartProducts: [...listOfCartProducts, product] });
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { title, price, thumbnail } = product;
    const { listOfCartProducts } = this.state;
    // console.log();
    return (
      <div>
        <div>
          <Link
            to={ {
              pathname: '/',
              state: { listOfCartProducts },
            } }
          >
            <img alt="home" src="https://img.icons8.com/material/48/000000/home--v5.png" />
          </Link>
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
        <h4 data-testid="product-detail-name">{title}</h4>
        <h4>
          R$
          {price}
        </h4>
        <img src={ thumbnail } alt="produto" />
        <button
          onClick={ this.setListOfCartProducts }
          data-testid="product-detail-add-to-cart"
          type="button"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};
