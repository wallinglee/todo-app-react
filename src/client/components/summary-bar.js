import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';

const propTypes = {
  activeTasks: PropTypes.number
};

const defaultProps = {
  activeTasks: 0
};

const SummaryBar = ({activeTasks, completeAll}) => {
  return (
    <div className="summary-bar">
      <div className="container">
        <span>{activeTasks} tasks remaining</span>
        <Button text="Complete All" onClick={completeAll} disabled={activeTasks < 1} />
      </div>
    </div>
  );
};

SummaryBar.propTypes = propTypes;
SummaryBar.defaultProps = defaultProps;

export default SummaryBar;