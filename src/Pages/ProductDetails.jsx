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
    this.addRating = this.addRating.bind(this);
    const { location: { state: { product: { id } } } } = this.props;
    this.state = {
      quantity: (
        localStorage.getItem(id)
          ? JSON.parse(localStorage.getItem(id)).quantity : 1),
      updateState: false,
    };
  }

  setListOfCartProducts() {
    const { location: { state: { product } } } = this.props;
    const { quantity } = this.state;
    product.quantity = quantity;
    product.isOnCart = true;
    localStorage.setItem(
      product.id, JSON.stringify(product),
    );
  }

  addRating(email, message, rating) {
    const { location: { state: { product } } } = this.props;
    product.isOnCart = false;
    product.rating = product.rating
      ? [...product.rating, { email, message, rating }] : [{ email, message, rating }];
    localStorage.setItem(product.id, JSON.stringify(product));
    const { updateState } = this.state;
    this.setState({ updateState: !updateState });
  }

  addOrRemoveQuantity({ target: { value } }) {
    let { quantity } = this.state;
    this.setState({ quantity: value === '+' ? quantity += 1 : quantity -= 1 });
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { title, price, thumbnail } = product;
    const { quantity } = this.state;
    const productForRating = JSON.parse(localStorage.getItem(product.id));
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
        <RatingForm addRating={ this.addRating } />
        <div>
          {productForRating !== null && productForRating.rating.map((rating) => (
            <div key={ rating.email }>
              <h4>Avaliação:</h4>
              <p>{rating.email}</p>
              <p>{rating.message}</p>
              <p>
                Nota:
                {rating.rating}
              </p>
            </div>))}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};
