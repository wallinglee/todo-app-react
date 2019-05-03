import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

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
const Navbar = ({ filterBy, onClickFilter }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <div className="row">
        <div className="col-9">
          <NavLink
            to="/"
            activeClassName={`${baseCls}__item--active`}
            className={`${baseCls}__item`}
            onClick={() => onClickFilter('')}
          >
            All
          </NavLink>
          <NavLink
            to="/active"
            activeClassName={`${baseCls}__item--active`}
            className={`${baseCls}__item`}
            onClick={() => onClickFilter('active')}
          >
            Active1
          </NavLink>
          <span
            className={activeLinkCls}
            onClick={() => onClickFilter('active')}
          >
            Active2
          </span>
          <span
            className={completedLinkCls}
            onClick={() => onClickFilter('completed')}
          >
            Completed
          </span>
        </div>
        <div className="col-3 text-right">Archive all completed</div>
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
