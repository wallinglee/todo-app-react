import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls}>
      <div className="container">
        <nav className="navbar">
          <h1>
            <Link to="/">MyTodos</Link>
          </h1>
        </nav>
      </div>
    </div>
  )
};

export default Header;
