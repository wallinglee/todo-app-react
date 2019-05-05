import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter, archiveAllCompleted }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar';
  const activeClassName = `${baseCls}__item--active`;

  return (
    <div className={baseCls}>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <NavLink
              to="/"
              exact
              activeClassName={activeClassName}
              className={baseCls + '__item'}
              onClick={() => onClickFilter('')}
            >
            All
            </NavLink>
            <NavLink
              to="/active"
              exact
              activeClassName={activeClassName}
              className={baseCls + '__item'}
              onClick={() => onClickFilter('active')}
            >
            Active
            </NavLink>
            <NavLink
              to="/completed"
              exact
              activeClassName={activeClassName}
              className={baseCls + '__item'}
              onClick={() => onClickFilter('completed')}
            >
            Completed
            </NavLink>
            <NavLink
              to="/archive"
              exact
              activeClassName={activeClassName}
              className={baseCls + '__item'}
              onClick={() => onClickFilter('archive')}
            >
            Archive
            </NavLink>
          </div>
          <div className="col-3 text-right">
            <Button text="Archive all completed" onClick={archiveAllCompleted} />
          </div>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
