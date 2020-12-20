import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import MainPage from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const history = createBrowserHistory()

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <MainPage/>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


