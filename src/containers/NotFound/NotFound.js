import React from 'react';
import Logo from '../../assets/Logo.png';
import './NotFoundCSS.css';

function NotFound() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <h2 className='mt-5'>404 Page Not Found</h2>
      </header>
    </div>
  );
}

export default NotFound;
