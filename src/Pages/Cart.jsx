import React, { Component } from 'react';
import BackHome from '../Components/BackHome';
import { Quantity } from '../Components/Quantity';

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
    const products = [];
    list.map((product) => products.push(JSON.parse(product)));
    this.setState({ listOfProducts: products });
    this.handleTotalPrice(products);
  }

  removeProduct({ target: { value } }) {
    console.log(value);
    localStorage.removeItem(value);
    this.setListOfProducts();
  }

  render() {
    const { listOfProducts, totalPrice } = this.state;
    const total = `Preço Total: R$ ${totalPrice}`;
    return (
      <main>
        <BackHome />
        <section>
          {(listOfProducts.length === 0) ? (
            <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
          )
            : listOfProducts.map((product) => (
              <section key={ product.id } data-testid="product">
                <h4 data-testid="shopping-cart-product-name">
                  { product.title }
                </h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <h5>{ `R$ ${product.price}` }</h5>
                <div>
                  <Quantity
                    setListOfProducts={ this.setListOfProducts }
                    id={ product.id }
                    quantity={ product.quantity }
                  />
                </div>
                <button
                  value={ product.id }
                  onClick={ this.removeProduct }
                  type="button"
                >
                  X
                </button>
              </section>
            ))}
        </section>
        <div>
          <h3>
            {total}
          </h3>
          <button type="button">Finalizar Compra</button>
        </div>
      </main>
    );
  }
}

export default Cart;
