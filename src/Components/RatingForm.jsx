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
      <section className="bg-white shadow rounded-lg p-6 mt-4">
        <form
          className="border focus-within:border-blue-500
          focus-within:text-blue-500 transition-all duration-500 relative rounded p-1"
          onSubmit={ this.handleSubmit }
        >
          <h3>Avalie esse Produto</h3>
          <div>
            <input
              className="shadow appearance-none border rounded w-full
              py-2 px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              required
              placeholder="E-mail"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <textarea
              className="shadow appearance-none border rounded w-full py-2
              px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              data-testid="product-detail-evaluation"
              name="message"
              maxLength="500"
              placeholder="Mensagem (opcional)"
              value={ message }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <ReactStars
              count={ 5 }
              onChange={ (event) => this.setState({ rating: event }) }
              size={ 40 }
              activeColor="#ffd700"
            />
          </div>
          <input
            className="rounded text-gray-100 px-3 py-1 bg-blue-500
            hover:shadow-inner hover:bg-blue-700 transition-all duration-300"
            type="submit"
            value="Save"
          />
        </form>
      </section>
    );
  }
}

RatingForm.propTypes = {
  addRating: PropTypes.func.isRequired,
};

export default RatingForm;
