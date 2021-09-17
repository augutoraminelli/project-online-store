import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <input
          data-testid="home-initial-message"
          placeholder="Digite sua Pesquisa"
          value="Digite algum termo de pesquisa ou escolha uma categoria."
        />
      </div>
    );
  }
}

export default Home;
