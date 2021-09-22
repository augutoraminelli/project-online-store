import React, { Component } from 'react';

class Checkout extends Component {
  render() {
    return (
      <section>
        <div>
          <h4>Revise seus Produtos</h4>
        </div>
        <section>
          <h4>Informações do comprador</h4>
          <form>
            <input
              type="text"
              name="full-name"
              placeholder="Nome Completo"
              size="30"
              data-testid="checkout-fullname"
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              size="30"
              data-testid="checkout-cpf"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              size="30"
              data-testid="checkout-email"
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefone"
              size="30"
              data-testid="checkout-phone"
            />
            <input
              type="text"
              name="full-cep"
              placeholder="CEP"
              size="30"
              data-testid="checkout-cep"
            />
            <input
              type="text"
              name="address"
              placeholder="Endereço"
              size="30"
              data-testid="checkout-address"
            />
            <input
              type="text"
              name="address-comp"
              placeholder="Complemento"
              size="30"
            />
            <input
              type="number"
              name="address-number"
              placeholder="Número"
              size="30"
            />
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              size="30"
            />
            <select name="state">
              <option value="rj">RJ</option>
              <option value="mg">MG</option>
              <option value="parana">PR</option>
              <option value="sp">SP</option>
              <option value="am">AM</option>
              <option value="pe">PE</option>
            </select>
            <h4>Forma de pagamento</h4>
            <img alt="card" src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" />
            <input type="radio" name="payment" id="" />
            Visa
            <img alt="card" src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" />
            <input type="radio" name="payment" id="" />
            Mastercard
            <img alt="card" src="https://img.icons8.com/ios/50/000000/bank-card-back-side.png" />
            <input type="radio" name="payment" id="" />
            Elo
            <img alt="bank slip" src="https://img.icons8.com/ios/50/000000/barcode.png" />
            <input type="radio" name="payment" id="" />
            Boleto
            <button type="button">Comprar</button>
          </form>
        </section>
      </section>
    );
  }
}

export default Checkout;
