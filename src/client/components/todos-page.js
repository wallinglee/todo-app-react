import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';
import SummaryBar from "./summary-bar";

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page';

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: null,
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
    let currStatus = this.props.location.pathname.replace('/','');
    this.setFilterBy(currStatus);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      let propStatus = nextProps.location.pathname.replace('/','');
      this.setState({ filterBy:  propStatus});
    }
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo = (text) => {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo = (json) => {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy = (filterBy) => {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos = (todos) => {
    this.setState({ todos });
  }

  /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  putTodo = (json) => {
    const index = this.state.todos.findIndex((todo) => {
      return todo.id === json.id;
    });

    this.updateTodos(
      [
        ...this.state.todos.slice(0, index),
        json,
        ...this.state.todos.slice(index + 1),
      ]
    );
  }

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  onClickTodo = (todo) => {
    const newTodo = Object.assign({}, todo);
    newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
    newTodo.archive = false;

    api('PUT', newTodo, this.putTodo);
  }

  completeAll = () => {
    this.state.todos.forEach((todo) => {
      if (todo.status !== 'complete') {
        this.onClickTodo(todo);
      }
    });
  }

  getActiveTaskCount = () => {
    let numCount = 0;
    this.state.todos.map(todo => {if(todo.status !== 'complete') numCount++});
    return numCount;
  }

  archiveAllCompleted = (todos) => {
    this.state.todos.forEach((todo) => {
      if (todo.status !== 'complete') {
        throw new Error('Todo not complete, can\'t archive.');
      }
      todo.archive = true;
      api('PUT', todo, this.putTodo);
    });
  }

  archiveTodo = (todo) => {
    const newTodo = Object.assign({}, todo);
    if (newTodo.status !== 'complete') {
      throw new Error('Todo not complete, can\'t archive.');
    }
    newTodo.archive = true;

    api('PUT', newTodo, this.putTodo);
  };

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    const baseCls = 'todos-page';
    return (
      <div className={baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} archiveAllCompleted={this.archiveAllCompleted} />

        <SummaryBar activeTasks={this.getActiveTaskCount()} completeAll={this.completeAll} />

        <TodoForm onSubmit={this.addTodo} />

        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
          onClickTodo={this.onClickTodo}
          putTodo={this.putTodo}
          archiveTodo={this.archiveTodo}
        />
      </div>
    );
  }
}

export default TodosPage;
