import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShoppingCart from '../Components/ShoppingCart';
import BackHome from '../Components/BackHome';

export default class ProductDetails extends Component {
  render() {
    const { location: { state: { product } } } = this.props;
    const { title, price, thumbnail } = product;
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
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};
