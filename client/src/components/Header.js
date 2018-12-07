import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="App-header">
    <Link to="/">
      <div className="large-header">
        <h2 className="App-header">FüDR</h2>
      </div>
    </Link >
  </header>

);

export default Header;
