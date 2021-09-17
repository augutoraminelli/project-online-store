import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Digite seu texto aqui." />
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </div>
    );
  }
}

export default Home;
