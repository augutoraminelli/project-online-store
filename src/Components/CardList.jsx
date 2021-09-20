import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class CardList extends Component {
  constructor() {
    super();

    this.productList = this.productList.bind(this);

    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    this.productList();
  }

  // categoria genérica para testes
  async productList() {
    const { categorySelected, productSearch } = this.props;
    const productList = await
    getProductsFromCategoryAndQuery(categorySelected, productSearch);
    this.setState({
      productList: ((productList) ? productList.results : []),
    });
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        {(productList.length === 0) ? (
          <h4>Nenhum produto foi encontrado</h4>
        )
          : productList.map((product) => (
            <section key={ product.id } data-testid="product">
              <h4>
                { product.title }
              </h4>
              <img src={ product.thumbnail } alt={ product.title } />
              <h5>{ `R$ ${product.price}` }</h5>
            </section>))}
      </div>
    );
  }
}

CardList.propTypes = {
  productSearch: PropTypes.string.isRequired,
  categorySelected: PropTypes.string.isRequired,
};

export default CardList;
