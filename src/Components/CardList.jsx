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
            <section key={ product.id } data-testid="product">
              <h4>
                { product.title }
              </h4>
              <img src={ product.thumbnail } alt={ product.title } />
              <h5>{ `R$ ${product.price}` }</h5>
              <Link
                data-testid="product-detail-link"
                to={ {
                  pathname: `product-details/${product.id}/`,
                  state: { product },
                } }
              >
                Mais Detalhes
              </Link>
            </section>
          ))}
      </div>
    );
  }
}

CardList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardList;
