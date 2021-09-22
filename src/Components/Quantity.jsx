import React, { Component } from 'react';

export class Quantity extends Component {
  constructor() {
    super();
    this.state = { quantity: 1 };
    this.addOrRemoveQuantity = this.addOrRemoveQuantity.bind(this);
  }

  addOrRemoveQuantity({ target: { value } }) {
    let { quantity } = this.state;
    this.setState({ quantity: value === '+' ? quantity += 1 : quantity -= 1 });
  }

  render() {
    const { quantity } = this.state;
    return (
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
    );
  }
}

export default Quantity;
