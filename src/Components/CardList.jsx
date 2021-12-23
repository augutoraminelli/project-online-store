import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/cardList.css';

class CardList extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(event) {
    event.preventDefault();
    const { target: { value } } = event;
    const { productList, changeTotalItensOfCart } = this.props;
    const product = productList.find((item) => item.id === value);
    const productFromLocalStorage = JSON.parse(localStorage.getItem(product.id) || null);
    if (productFromLocalStorage) {
      productFromLocalStorage.quantity = productFromLocalStorage.quantity
        ? productFromLocalStorage.quantity + 1 : 1;
      productFromLocalStorage.isOnCart = true;
      localStorage.setItem(product.id, JSON.stringify(productFromLocalStorage));
    } else {
      product.isOnCart = true;
      product.quantity = 1;
      product.rating = product.rating || [];
      localStorage.setItem(product.id, JSON.stringify(product));
    }
    changeTotalItensOfCart();
  }

  render() {
    const { productList, listOfCartProducts } = this.props;

    return (
      <div className="space-y-20">
        {(!productList) ? (
          <h4
            className="text-red-900 font-bold font-sans italic text-lg font-bold"
          >
            Nenhum produto foi encontrado
          </h4>
        )
          : productList.map((product) => (
            <section
              key={ product.id }
              className="rounded bg-white shadow
              appearance-none border shadow-2xl p-4 flex leading-normal"
            >
              <img
                className="product-image flex-none bg-cover text-center"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <div className="mr-20 space-y-5 justify-self-center w-full">
                <h4
                  className="text-gray-900 font-bold font-sans italic text-lg font-bold"
                >
                  { product.title }
                </h4>
                { product.shipping.free_shipping
              && <p><strong className="text-teal-500">Frete Grátis</strong></p> }
                <div className="space-y-5">
                  <strong
                    className="font-mono italic"
                  >
                    { `R$ ${product.price}` }
                  </strong>
                </div>
                <div className="space-x-5">
                  <Link
                    data-testid="product-detail-link"
                    to={ {
                      pathname: `product-details/${product.id}/`,
                      state: { product, listOfCartProducts },
                    } }
                  >
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white
                    font-bold py-1 px-2 border border-blue-700 rounded"
                      type="button"
                    >
                      Mais Detalhes
                    </button>
                  </Link>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white
                    font-bold py-1 px-2 border border-blue-700 rounded"
                    value={ product.id }
                    onClick={ this.addToCart }
                    type="submit"
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
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
