import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Quantity } from '../Components/Quantity';

class Cart extends Component {
  constructor(props) {
    super(props);
    const { location: { state: { listOfCartProducts } } } = this.props;
    this.removeProductFromState = this.removeProductFromState.bind(this);
    this.state = { listOfCartProducts };
  }

  removeProductFromState({ target: { value } }) {
    const { listOfCartProducts } = this.state;
    const productToBeRemovedInTheState = listOfCartProducts
      .filter((product) => product.id !== value);
    this.setState({ listOfCartProducts: productToBeRemovedInTheState });
  }

  render() {
    const { listOfCartProducts } = this.state;
    return (
      <main>
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
                <div>
                  <Quantity />
                </div>
                <button
                  value={ product.id }
                  onClick={ this.removeProductFromState }
                  type="button"
                >
                  X
                </button>
              </section>
            ))}
        </section>
        <button type="button">Finalizar Compra</button>
      </main>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Cart;
