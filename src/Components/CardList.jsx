import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardList extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(event) {
    const { target: { value } } = event;
    event.target.disabled = true;
    const { productList, handleListOfCartProducts } = this.props;
    event.preventDefault();
    const newProductToCart = productList.find((product) => product.id === value);
    handleListOfCartProducts(newProductToCart);
  }

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
              <button
                disabled={ false }
                value={ product.id }
                onClick={ this.addToCart }
                type="submit"
                data-testid="product-add-to-cart"
              >
                Adicionar ao Carrinho
              </button>
            </section>
          ))}
      </div>
    );
  }
}

CardList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleListOfCartProducts: PropTypes.func.isRequired,
};

export default CardList;
