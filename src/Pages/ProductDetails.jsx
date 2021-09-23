import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackHome from '../Components/BackHome';
import ShoppingCart from '../Components/ShoppingCart';
import RatingForm from '../Components/RatingForm';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.setListOfCartProducts = this.setListOfCartProducts.bind(this);
    this.addOrRemoveQuantity = this.addOrRemoveQuantity.bind(this);
    const { location: { state: { product: { id } } } } = this.props;
    this.state = {
      quantity: (
        localStorage.getItem(id)
          ? JSON.parse(localStorage.getItem(id)).quantity : 1),
    };
  }

  setListOfCartProducts() {
    const { location: { state: { product } } } = this.props;
    const { quantity } = this.state;
    product.quantity = quantity;
    localStorage.setItem(
      product.id, JSON.stringify(product),
    );
  }

  addOrRemoveQuantity({ target: { value } }) {
    let { quantity } = this.state;
    this.setState({ quantity: value === '+' ? quantity += 1 : quantity -= 1 });
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { title, price, thumbnail } = product;
    const { quantity } = this.state;
    return (
      <div>
        <div>
          <BackHome />
          <ShoppingCart />
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
        <div>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            disabled={ quantity === 1 }
            onClick={ this.addOrRemoveQuantity }
            value="-"
          >
            -
          </button>
          <span data-testid="shopping-cart-product-quantity">{ quantity }</span>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.addOrRemoveQuantity }
            value="+"
          >
            +
          </button>
        </div>
        <RatingForm />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};
