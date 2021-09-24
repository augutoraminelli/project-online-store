import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Quantity extends Component {
  constructor(props) {
    super(props);
    const { quantity } = props;
    this.state = { quantity };
    this.addOrRemoveQuantity = this.addOrRemoveQuantity.bind(this);
  }

  addOrRemoveQuantity({ target: { value } }) {
    let { quantity } = this.state;
    const { setListOfProducts } = this.props;
    this.setState({ quantity: value === '+' ? quantity += 1 : quantity -= 1 });
    setListOfProducts();
  }

  render() {
    const { quantity } = this.state;
    const { availableQuantity } = this.props;
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
          disabled={ quantity >= availableQuantity }
          onClick={ this.addOrRemoveQuantity }
          value="+"
        >
          +
        </button>
      </div>
    );
  }
}

Quantity.propTypes = {
  availableQuantity: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  setListOfProducts: PropTypes.func.isRequired,
};

export default Quantity;
