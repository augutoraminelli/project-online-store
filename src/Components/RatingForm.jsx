import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';

class RatingForm extends Component {
  constructor() {
    super();

    this.state = { message: '', email: '', rating: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const { addRating } = this.props;
    const { message, email, rating } = this.state;
    event.preventDefault();
    addRating(email, message, rating);
  }

  render() {
    const { message, email } = this.state;
    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
          <h4>Avaliações</h4>
          <div>
            <input
              type="email"
              name="email"
              maxLength="50"
              required
              placeholder="E-mail"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <textarea
              data-testid="product-detail-evaluation"
              name="message"
              maxLength="500"
              placeholder="Mensagem (opcional)"
              value={ message }
              onChange={ this.handleChange }
            />
          </div>
          <input type="submit" value="Avaliar" />
          <div>
            <ReactStars
              count={ 5 }
              onChange={ (event) => this.setState({ rating: event }) }
              size={ 40 }
              activeColor="#ffd700"
            />
          </div>
        </form>
      </section>
    );
  }
}

RatingForm.propTypes = {
  addRating: PropTypes.func.isRequired,
};

export default RatingForm;
