import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * TodoForm component
 * @class
 */
class TodoForm extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todo-form';

  /**
   * Prop Types
   * @static
   */
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: noop,
  };

  /**
   * Constructor
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = { input: '' };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * On change handler for input field
   * @param  {object} e - Event object
   */
  onChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  /**
   * On submit handler for submitting form
   * @param  {object} e - Event object
   */
  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.input);

    this.setState({ input: '' });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className="todo-form container">
        <div className="row">
          <div className="col-6 offset-3">
            <form onSubmit={this.onSubmit}>
              <input
                onChange={this.onChange}
                placeholder="Add new todo..."
                value={this.state.input}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoForm;
