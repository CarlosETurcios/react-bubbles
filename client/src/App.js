import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import './styles.scss';
import PrivateRoute from './components/PrivetRoute';
import BubblePage from './components/BubblePage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={Login} />
        <Switch>
          <PrivateRoute path='/protected' component={BubblePage} />
        </Switch>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
