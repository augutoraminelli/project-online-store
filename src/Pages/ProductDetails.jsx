import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BackHome from '../Components/BackHome';
import ShoppingCart from '../Components/ShoppingCart';
import RatingForm from '../Components/RatingForm';
import numberItens from '../services/numberItens';

import '../style/productDetails.css';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.setListOfCartProducts = this.setListOfCartProducts.bind(this);
    this.addOrRemoveQuantity = this.addOrRemoveQuantity.bind(this);
    this.addRating = this.addRating.bind(this);
    this.updateNumberItens = this.updateNumberItens.bind(this);

    this.state = {
      quantity: 1,
      updateState: false,
      numberItensUpdate: numberItens(),
    };
  }

  setListOfCartProducts() {
    let { location: { state: { product } } } = this.props;
    const { quantity } = this.state;
    const productFromLocalStorage = JSON.parse(localStorage.getItem(product.id) || null);
    if (productFromLocalStorage) {
      product = productFromLocalStorage;
      product.quantity = product.quantity
        ? product.quantity + quantity : quantity;
      product.rating = product.rating || [];
      product.isOnCart = true;
      this.updateNumberItens();
    } else {
      product.quantity = quantity;
      product.isOnCart = true;
      product.rating = [];
    }
    localStorage.setItem(product.id, JSON.stringify(product));
    this.updateNumberItens();
  }

  addRating(email, message, rating) {
    const { location: { state: { product } } } = this.props;
    const productFromLocalStorage = JSON.parse(localStorage.getItem(product.id))
     || null;
    if (productFromLocalStorage) {
      if (productFromLocalStorage.rating.length > 0) {
        productFromLocalStorage.rating = [{ email, message, rating },
          ...productFromLocalStorage.rating];
        localStorage.setItem(product.id, JSON.stringify(productFromLocalStorage));
      } else {
        productFromLocalStorage.rating = [{ email, message, rating }];
        localStorage.setItem(product.id, JSON.stringify(productFromLocalStorage));
      }
    } else {
      product.isOnCart = false;
      product.rating = [{ email, message, rating }];
      localStorage.setItem(product.id, JSON.stringify(product));
    }
    this.setState((prev) => ({ updateState: !prev.updateState }));
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
    console.log(productForRating);
    return (
      <section>
        <div className="header-product-detail">
          <BackHome />
          <div className="mr-5">
            <Link to="/cart">
              <ShoppingCart NumberOfItens={ numberItensUpdate } />
            </Link>
          </div>
        </div>
        <div
          className="flex-col cart-section bg-white
          shadow-2xl rounded px-10 pt-6 pb-8 mb-2"
        >
          <h4
            className="font-sans italic text-lg
              text-gray-800 text-center mb-5"
          >
            {title}
          </h4>
          <h4 className="font-sans italic text-lg text-gray-800 text-center">
            R$
            {price}
          </h4>
          <img className="cart-image" src={ thumbnail } alt="produto" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 border border-blue-700 rounded mt-4"
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
              className="bg-gray-300 hover:bg-gray-400 disabled:opacity-10
              text-gray-800 font-bold py-2 px-4 rounded-l mr-2 mt-4 mb-4"
              type="button"
              disabled={ quantity === 1 }
              onClick={ this.addOrRemoveQuantity }
              value="-"
            >
              -
            </button>
            <span data-testid="shopping-cart-product-quantity">{ quantity }</span>
            <button
              className="bg-gray-300 hover:bg-gray-400 disabled:opacity-10
              text-gray-800 font-bold py-2 px-4 rounded-r ml-2 mt-4 mb-4"
              type="button"
              disabled={ quantity >= product.available_quantity }
              onClick={ this.addOrRemoveQuantity }
              value="+"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <RatingForm addRating={ this.addRating } />
        </div>
        <h3
          className="mb-4 text-lg font-semibold
          text-gray-900 mt-4"
        >
          <strong>Avaliações</strong>
        </h3>
        <div className="space-y-4">
          {
            productForRating !== null
             && productForRating.rating.map((rating) => (
               <div
                 className="flex-1 border rounded-lg px-4
                py-2 sm:px-6 sm:py-4 leading-relaxed space-y-3"
                 key={ rating.email }
               >
                 <p><strong>{rating.email}</strong></p>
                 <p className="text-sm">{rating.message}</p>
                 <p>
                   Nota:
                   <strong>{rating.rating}</strong>
                 </p>
               </div>))
          }
        </div>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
