import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardList extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        {(!productList) ? (
          <h4>Nenhum produto foi encontrado</h4>
        )
          : productList.map((product) => (
            <Link
              to={ `product-details/${product.id}` }
              key={ product.id }
              data-testid="product-detail-link"
            >
              <section data-testid="product">
                <h4>
                  { product.title }
                </h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <h5>{ `R$ ${product.price}` }</h5>
              </section>
            </Link>))}
      </div>
    );
  }
}

CardList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardList;
