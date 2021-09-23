import React, { Component } from 'react';
import StarRating from './StarRating';

class RatingForm extends Component {
  constructor() {
    super();

    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Avaliação enviada' + this.state.value);
    event.preventDefault();
  }


  render() {
    const { value } = this.state;
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <h4>Avaliações</h4>
          <StarRating />
          <div>
              <input
                type="email"
                name="email"
                maxLength="50"
                required
                placeholder="E-mail"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          <div>
            <textarea
              data-testid="product-detail-evaluation"
              name="message"
              maxLength="500"
              placeholder="Mensagem (opcional)"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Avaliar" />
        </form>
        <div>
          <p>E-mail: {value}</p>
          <p>Mensagem: {value}</p>
          <p>Avaliação: {value}</p>
        </div>
        </section>
    );
  }
}

export default RatingForm;