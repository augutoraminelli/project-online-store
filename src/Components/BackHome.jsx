import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BackHome extends Component {
  render() {
    return (
      <div>
        <Link to="/"><img alt="home" src="https://img.icons8.com/material/12/000000/home--v5.png" /></Link>
      </div>
    );
  }
}

export default BackHome;
