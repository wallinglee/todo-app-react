import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickTodo: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
  archiveTodo: PropTypes.func,
  filterBy: PropTypes.string
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
  archiveTodo: noop,
  filterBy: ''
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickTodo, status, text, archiveTodo, filterBy }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  const opt = text + 'ID';

  return (
    <li className={todoCls + ' row align-items-center'}>
      <span className="col-11">
        <input
          type="checkbox"
          onChange={onClickTodo}
          checked={status === 'complete'}
          id={opt}
        />
        <TodoLink opt={opt} text={text} onClick={onClickTodo} />
        {(status === 'complete' && filterBy !== 'archive') && (
          <Button addClass=" archive" text="Archive" onClick={archiveTodo} />
        )}
      </span>
      <span className="col-1 text-center">
        <Button addClass=" delete" text="&times;" onClick={onClickDelete} />
      </span>
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
