import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  opt: PropTypes.string
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
  opt: ''
};

/**
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ text, onClick, opt }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo-link';

  return (
    <label htmlFor={opt} className={baseCls} onClick={onClick}> <span></span> {text}</label>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
