import PropTypes from 'prop-types';
import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  updateTodos: PropTypes.func,
  onClickTodo: PropTypes.func,
  archiveTodo: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
  onClickTodo: noop,
  archiveTodo: noop
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos, onClickTodo, archiveTodo }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todos';

  /**
   * Callback function to delete todo from todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const deleteTodo = json => {
    const index = todos.findIndex(todo => {
      return todo.id === json.id;
    });

    updateTodos(
      [
        ...todos.slice(0, index),
        ...todos.slice(index + 1),
      ]
    );
  }

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {
    api('DELETE', todo, deleteTodo);
  };

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  const renderTodos = () => {
    if (!Array.isArray(todos)) {
      return null;
    }

    return todos.map(todo => {
      let filtered;
      switch (filterBy) {
        case 'active':
          filtered = todo.status === 'complete';
          break;
        case 'completed':
          filtered = todo.status !== 'complete';
          break;
        case 'archive':
          filtered = !todo.archive;
          break;
        default:
          filtered = todo.archive; // Hide archived todos
      }

      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={() => {onClickDelete(todo)}}
          onClickTodo={() => {onClickTodo(todo)}}
          archiveTodo={() => {archiveTodo(todo)}}
          status={todo.status}
          text={todo.text}
          filterBy={filterBy}
        />
      );
    })
  }

  return (
    <ul className={baseCls + ' container ' + filterBy}>
      {renderTodos()}
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
