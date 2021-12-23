import React, { Component } from 'react';
import barcode from '../icons/barcode.png';
import bankCard from '../icons/bank-card.png';

export class CheckoutInputs extends Component {
  render() {
    const inputs = ['Nome completo', 'CPF',
      'Endereço', 'Email', 'Cidade', 'Telefone', 'CEP'];

    return (
      <>
        <form className="form-checkout">
          <div className="flex md:w-1/2 flex-wrap -mx-3 mb-6 mt-10">
            {inputs.map((type, index) => (
              <>
                <div key={ index } className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase
                 tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={ index }
                  >
                    {type}
                  </label>
                  <input
                    className="appearance-none
                  block w-full bg-gray-200 text-gray-700 border
                  rounded py-3 px-4 mb-3 leading-tight
                  focus:outline-none focus:bg-white focus:border-gray-500"
                    id={ index }
                    type="text"
                    placeholder={ type }
                  />
                </div>
                {inputs.length - 1 === index && (
                  <div className="w-full relative md:w-1/2 px-1 mb-6 md:mb-0 mt-6">
                    <select
                      className="block
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
                  </div>
                )}
              </>
            ))}
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
            <img alt="card" src={ bankCard } />
            {['Visa', 'Mastercard', 'Elo'].map((method, index) => (
              <label key={ index } htmlFor={ method }>
                <input type="radio" name="payment" id={ method } />
                {' '}
                {method}
              </label>
            ))}
          </div>
          <div className="flex payment-check space-x-2">
            <img alt="bank slip" src={ barcode } />
            <label htmlFor="Boleto">
              <input type="radio" name="payment" id="Boleto" />
              {' '}
              Boleto
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default CheckoutInputs;
