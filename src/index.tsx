import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { connect, Provider } from "react-redux";
import MainPage from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';

//@ts-ignore
window.store = store

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    )
  }
}

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'));


