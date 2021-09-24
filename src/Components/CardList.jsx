import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardList extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(event) {
    event.preventDefault();
    const { target: { value } } = event;
    const { productList, changeTotalItensOfCart } = this.props;
    let product = productList.find((item) => item.id === value);
    const productFromLocalStorage = JSON.parse(localStorage.getItem(product.id));
    if (productFromLocalStorage && !productFromLocalStorage.rating) {
      product = JSON.parse(localStorage.getItem(product.id));
      product.quantity += 1;
    } else {
      product.quantity = 1;
      product.isOnCart = true;
    }
    localStorage.setItem(
      product.id, JSON.stringify(product),
    );
    changeTotalItensOfCart();
  }

  render() {
    const { productList, listOfCartProducts } = this.props;
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
              { product.shipping.free_shipping
              && <div data-testid="free-shipping">Frete Grátis</div> }
              <h5>{ `R$ ${product.price}` }</h5>
              <Link
                data-testid="product-detail-link"
                to={ {
                  pathname: `product-details/${product.id}/`,
                  state: { product, listOfCartProducts },
                } }
              >
                Mais Detalhes
              </Link>
              <button
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
  listOfCartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTotalItensOfCart: PropTypes.func.isRequired,
};

export default CardList;
