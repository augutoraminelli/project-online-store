import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackHome from '../Components/BackHome';
import ShoppingCart from '../Components/ShoppingCart';
import RatingForm from '../Components/RatingForm';
import numberItens from '../services/numberItens';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.setListOfCartProducts = this.setListOfCartProducts.bind(this);
    this.addOrRemoveQuantity = this.addOrRemoveQuantity.bind(this);
    this.addRating = this.addRating.bind(this);
    this.updateNumberItens = this.updateNumberItens.bind(this);

    const { location: { state: { product: { id } } } } = this.props;
    this.state = {
      quantity: 1,
      updateState: false,
      numberItensUpdate: numberItens(),
      isRating: (JSON.parse(localStorage.getItem(id))
      && JSON.parse(localStorage.getItem(id)).rating),
    };
  }

  setListOfCartProducts() {
    let { location: { state: { product } } } = this.props;
    const { quantity } = this.state;
    const productFromLocalStorage = JSON.parse(localStorage.getItem(product.id));
    if (productFromLocalStorage && productFromLocalStorage.isOnCart) {
      product = JSON.parse(localStorage.getItem(product.id));
      product.quantity += quantity;
      product.isOnCart = true;
      this.updateNumberItens();
    } else {
      product.quantity = quantity;
      product.isOnCart = true;
    }
    localStorage.setItem(product.id, JSON.stringify(product));
    this.updateNumberItens();
  }

  addRating(email, message, rating) {
    const { location: { state: { product } } } = this.props;
    const { isRating, quantity } = this.state;
    const productFromLocalStorage = JSON.parse(localStorage.getItem(product.id))
     || product;
    if (isRating) {
      productFromLocalStorage.rating = [...productFromLocalStorage.rating,
        { email, message, rating }];
      if (productFromLocalStorage.isOnCart) productFromLocalStorage.quantity += quantity;
      localStorage.setItem(product.id, JSON.stringify(productFromLocalStorage));
    } else {
      productFromLocalStorage.rating = productFromLocalStorage.rating
        ? [...productFromLocalStorage.rating, { email, message, rating }]
        : [{ email, message, rating }];
      localStorage.setItem(productFromLocalStorage.id,
        JSON.stringify(productFromLocalStorage));
      const { updateState } = this.state;
      this.setState({ updateState: !updateState });
    }
  }

  addOrRemoveQuantity({ target: { value } }) {
    let { quantity } = this.state;
    this.setState({ quantity: value === '+' ? quantity += 1 : quantity -= 1 });
  }

  updateNumberItens() {
    this.setState({ numberItensUpdate: numberItens() });
  }

  render() {
    const { location: { state: { product } } } = this.props;
    const { title, price, thumbnail } = product;
    const { quantity, numberItensUpdate } = this.state;
    const productForRating = JSON.parse(localStorage.getItem(product.id));
    return (
      <div>
        <div>
          <BackHome />
          <div>
            <ShoppingCart />
            <span data-testid="shopping-cart-size">{numberItensUpdate}</span>
          </div>
        </div>
        <h4 data-testid="product-detail-name">{title}</h4>
        <h4>
          R$
          {price}
        </h4>
        <img src={ thumbnail } alt="produto" />
        <button
          onClick={ this.setListOfCartProducts }
          disabled={
            productForRating
            && productForRating.isOnCart
            && productForRating.quantity === product.available_quantity
          }
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
            disabled={ quantity >= product.available_quantity }
            onClick={ this.addOrRemoveQuantity }
            value="+"
          >
            +
          </button>
        </div>
        <RatingForm addRating={ this.addRating } />
        <div>
          {
            productForRating !== null
            && productForRating.rating
            && productForRating.rating.map((rating) => (
              <div key={ rating.email }>
                <h4>Avaliação:</h4>
                <p>{rating.email}</p>
                <p>{rating.message}</p>
                <p>
                  Nota:
                  {rating.rating}
                </p>
              </div>))
          }
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
