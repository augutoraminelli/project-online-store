import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductDetails extends Component {
  render() {
    const { location: { state: { product } } } = this.props;
    const { title, price, thumbnail } = product;
    return (
      <div>
        <header>Teste</header>
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
