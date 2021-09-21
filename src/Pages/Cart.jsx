import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const { location: { state: { listOfCartProducts } } } = this.props;

    return (
      <section>
        {(listOfCartProducts.length === 0) ? (
          <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
        )
          : listOfCartProducts.map((product) => (
            <section key={ product.id } data-testid="product">
              <h4 data-testid="shopping-cart-product-name">
                { product.title }
              </h4>
              <img src={ product.thumbnail } alt={ product.title } />
              <h5>{ `R$ ${product.price}` }</h5>
              <button type="button">-</button>
              <span data-testid="shopping-cart-product-quantity">1</span>
              <button type="button">+</button>
            </section>
          ))}
      </section>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Cart;
