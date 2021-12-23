import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackHome from '../Components/BackHome';
import { Quantity } from '../Components/Quantity';
import '../style/cart.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = { listOfProducts: [], totalPrice: 0 };
    this.removeProduct = this.removeProduct.bind(this);
    this.setListOfProducts = this.setListOfProducts.bind(this);
    this.handleTotalPrice = this.handleTotalPrice.bind(this);
  }

  componentDidMount() {
    this.setListOfProducts();
  }

  handleTotalPrice(products) {
    if (products !== 0) {
      const totalPrice = products.reduce((total, product) => (
        total + (product.price * product.quantity)), 0).toFixed(2);
      this.setState({ totalPrice });
    }
  }

  setListOfProducts() {
    const list = Object.values(localStorage);
    const filteredProducts = list.filter((product) => JSON.parse(product).isOnCart);
    const products = filteredProducts.map((item) => JSON.parse(item));
    this.setState({ listOfProducts: products });
    this.handleTotalPrice(products);
  }

  removeProduct({ target: { value } }) {
    const productFromLocalStorage = JSON.parse(localStorage.getItem(value));
    if (productFromLocalStorage.rating.length > 0) {
      delete productFromLocalStorage.quantity;
      productFromLocalStorage.isOnCart = false;
      localStorage.setItem(value, JSON.stringify(productFromLocalStorage));
    } else {
      localStorage.removeItem(value);
    }
    this.setListOfProducts();
  }

  render() {
    const { listOfProducts, totalPrice } = this.state;
    const total = `Preço Total: R$ ${totalPrice}`;
    return (
      <main className="flex-col justify-center">
        <BackHome />
        <section className="space-y-10">
          <div className="mb-3">
            <h3
              className="font-sans text-lg text-gray-800
            text-center font-bold mb-7 mt-7"
            >
              {total}
            </h3>
          </div>
          {(listOfProducts.length === 0) ? (
            <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
          )
            : listOfProducts.map((product) => (
              <section
                key={ product.id }
                className="flex-col cart-section
              bg-white shadow-2xl rounded px-10 pt-6 pb-8 mb-4"
              >
                <h4
                  className="font-sans
                 italic text-lg text-gray-800 text-center mb-5"
                >
                  { product.title }
                </h4>
                <div className="flex content-center">
                  <img
                    src={ product.thumbnail }
                    alt={ product.title }
                    className="cart-image"
                  />
                </div>
                <h5 className="mt-2">{ `R$ ${product.price}` }</h5>
                <div className="mt-4">
                  <Quantity
                    setListOfProducts={ this.setListOfProducts }
                    id={ product.id }
                    availableQuantity={ product.available_quantity }
                    quantity={ product.quantity }
                  />
                </div>
                <button
                  value={ product.id }
                  onClick={ this.removeProduct }
                  type="button"
                  className="bg-red-500 hover:bg-red-700
                   text-white font-bold py-2 px-4 border border-red-700 rounded mt-4"
                >
                  Remover Produto
                </button>
              </section>
            ))}
        </section>
        <div className="mt-5">
          <Link
            to={ {
              pathname: '/checkout',
              state: { listOfProducts, total },
            } }
          >
            <button
              type="button"
              disabled={ listOfProducts.length === 0 }
              data-testid="checkout-products"
              className="bg-blue-500
               hover:bg-blue-700 disabled:opacity-10
              text-white font-bold py-2 px-4 border border-blue-700 rounded mb-10"
            >
              Finalizar compra
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

export default Cart;
