import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iconHome from '../icons/icon-home.png';

class BackHome extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img
            className="w-10 ml-5 mt-5"
            alt="home"
            src={ iconHome }
          />
        </Link>
      </div>
    );
  }
}

export default BackHome;
