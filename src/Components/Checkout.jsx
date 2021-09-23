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
          <h4>Revise seus Produtos</h4>
          <h3>{total}</h3>
          <section>
            {listOfProducts.map((product) => (
              <div key={ product.id } data-testid="product">
                <h4 data-testid="shopping-cart-product-name">
                  { product.title }
                </h4>
                <img src={ product.thumbnail } alt={ product.title } />
                <h5>{ `${product.quantity} x R$ ${product.price}` }</h5>
                <h5>{`Subtotal: R$ ${(product.quantity * product.price).toFixed(2)}`}</h5>
              </div>
            ))}
          </section>
        </div>
        <section>
          <h4>Informações do comprador</h4>
          <form onSubmit={ this.clearCart }>
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
            <button type="submit">Comprar</button>
          </form>
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
