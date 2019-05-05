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
  addClass: PropTypes.string,
  disabled: PropTypes.bool
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
  addClass: '',
  disabled: false
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ text, onClick, addClass, disabled }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'button';

  return (
    <button className={baseCls + addClass} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
