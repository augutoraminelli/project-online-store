import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '../Pages/Home';

class Checkout extends Component {
  constructor() {
    super();
    this.clearCart = this.clearCart.bind(this);
    this.state = { redirect: false };
  }

  clearCart() {
    const { location: { state: { listOfProducts } } } = this.props;
    listOfProducts.map((item) => {
      const product = JSON.parse(localStorage.getItem(item.id));
      product.isOnCart = false;
      return product.rating ? localStorage.setItem(item.id, JSON.stringify(product))
        : localStorage.removeItem(item.id);
    });
    this.setState({ redirect: true });
  }

  render() {
    const { location: { state: { listOfProducts, total } } } = this.props;
    const { redirect } = this.state;
    return (
      <section>
        <Link to="/cart" data-testid="shopping-cart-button"><img alt="cart" src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-back-arrow-mintab-for-ios-becris-lineal-becris.png" /></Link>
        <div>
          <h1 className="font-medium text-lg">Revise seus Produtos</h1>
          <h3
            className="font-sans
           text-lg
           text-gray-800 text-center font-bold mb-2 truncate"
          >
            {total}

          </h3>
          <section className="space-y-10">
            {listOfProducts.map((product) => (
              <div
                key={ product.id }
                data-testid="product"
                className="flex-col
              cart-section bg-white shadow-2xl  rounded px-10 pt-6 pb-8 mb-4"
              >
                <h4
                  className="font-sans
                italic text-lg text-gray-800 text-center text-clip"
                >
                  { product.title }
                </h4>
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                  className="cart-image"
                />
                <h5>{ `${product.quantity} x R$ ${product.price}` }</h5>
                <h5
                  className="font-sans
                 text-lg text-gray-800 text-center font-bold"
                >
                  {`Subtotal: R$ ${(product.quantity * product.price).toFixed(2)}`}

                </h5>
              </div>
            ))}
          </section>
        </div>
        <section className="flex-col justify-center">
          <h4
            className="font-medium
           text-lg mt-10 mb-2 text-center"
          >
            Informações do comprador

          </h4>
          <form className="form-checkout">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase
                 tracking-wide
                  text-gray-700
                   text-xs
                    font-bold
                     mb-2"
                  htmlFor="grid-first-name"
                >
                  Nome completo
                </label>
                <input
                  className="appearance-none
                  block w-full bg-gray-200 text-gray-700 border
                  border-red-500 rounded py-3 px-4 mb-3 leading-tight
                  focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Nome Completo"
                />
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block
                 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  CPF
                </label>
                <input
                  className="appearance-none
                  block w-full
                  bg-gray-200
                  text-gray-700
                  border
                  border-gray-200
                  rounded py-3
                  px-4 leading-tight
                  focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="number"
                  placeholder="CPF"
                />
              </div>
            </div>
            <div className="flex space-x-3 ">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block
                 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Endereço
                  </label>
                  <input
                    className="appearance-none
                  block w-full bg-gray-200 text-gray-700
                  border border-gray-200 rounded py-3 px-4 mb-3
                  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="text"
                    placeholder="Endereço"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block
                 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none
                 block w-full bg-gray-200
                  text-gray-700 border border-gray-200 rounded py-3
                   px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                    focus:border-gray-500"
                    id="grid-password"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide
                 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Cidade
                </label>
                <input
                  className="appearance-none
                 block w-full bg-gray-200 text-gray-700 border border-gray-200
                  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                   focus:border-gray-500"
                  id="grid-city"
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide
                 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Estado
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none
                   w-full bg-gray-200 border
                    border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                     leading-tight focus:outline-none
                     focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>SP</option>
                    <option>RJ</option>
                    <option>MG</option>
                  </select>
                  <div
                    className="pointer-events-none absolute
                   inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  >
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide
                 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  CEP
                </label>
                <input
                  className="appearance-none
                 block w-full bg-gray-200
                  text-gray-700 border border-gray-200
                   rounded py-3 px-4
                    leading-tight focus:outline-none
                     focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                />
              </div>
              <div className=" w-full flex justify-center mt-6">
                <div>
                  <label
                    className="block uppercase
                tracking-wide text-gray-700
                 text-xs font-bold mb-2"
                    htmlFor="grid-zip"
                  >
                    Telefone
                  </label>
                  <input
                    className="appearance-none
                 block w-full bg-gray-200 text-gray-700 border
                  border-gray-200 rounded py-3 px-4
                   leading-tight focus:outline-none
                    focus:bg-white
                     focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    placeholder="Telefone"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="flex-col flex-wrap">
            <h4
              className="mt-10 font-sans text-lg
             text-gray-800 text-center font-bold mb-5"
            >
              {' '}
              Forma de pagamento

            </h4>
          </div>
          <div className="flex-col mb-5 mt-10 payment-check space-x-2">
            <div className="flex payment-check space-x-2">
              <img alt="card" src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" />
              <input type="radio" name="payment" id="Visa" />
              <label htmlFor="Visa">Visa</label>
              <input type="radio" name="payment" id="Mastercard" />
              <label htmlFor="Mastercard">Mastercard</label>
              <input type="radio" name="payment" id="Elo" />
              <label htmlFor="Elo">Elo</label>
            </div>
            <div className="flex payment-check space-x-2">
              <img alt="bank slip" src="https://img.icons8.com/ios/50/000000/barcode.png" />
              <input type="radio" name="payment" id="Boleto" />
              <label htmlFor="Boleto">Boleto</label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500
            hover:bg-blue-700 text-white font-bold
            py-2 px-4 border border-blue-700 rounded mt-5 mb-5"
          >
            Comprar

          </button>

        </section>
        {redirect && <Redirect to="/" Component={ Home } />}
      </section>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Checkout;
