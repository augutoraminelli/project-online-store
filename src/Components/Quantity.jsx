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
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mr-2"
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
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2"
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
