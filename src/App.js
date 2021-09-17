import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
      </BrowserRouter>
    </div>
  );
}

export default App;
