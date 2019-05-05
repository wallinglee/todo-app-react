import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TodosPage from './todos-page';
import Header from './header';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ children }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';

  return (
    <BrowserRouter>
      <div className={baseCls}>
        <Header />
        <Switch>
          <Route path="/" key="all" component={TodosPage} />
          <Route path="/active" key="active" component={TodosPage} />
          <Route path="/completed" key="completed" component={TodosPage} />
          <Route path="/archive" key="archive" component={TodosPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = propTypes;

export default App;
