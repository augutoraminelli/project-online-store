import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class CardList extends Component {
  constructor() {
    super();

    this.productList = this.productList.bind(this);

    this.state = {
      title: '',
      thumbnail: '',
      price: 0,
    };
  }

  componentDidMount() {
    this.productList();
  }

  // categoria genérica para testes
  async productList() {
    const { productSearch } = this.props;
    const productList = await getProductsFromCategoryAndQuery('MLB430637', productSearch);
    console.log(productList.results);
    this.setState({

    });
  }

  render() {
    const { productSearch } = this.props;
    const { title, thumbnail, price} = this.state;
    return (
      <div>
        <section>
          testando CardList
          {' '}
          {productSearch}
        </section>
      </div>
    );
  }
}

CardList.propTypes = {
  productSearch: PropTypes.string.isRequired,
};

export default CardList;
