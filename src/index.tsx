import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import { Provider } from "react-redux";
import MainPage from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import setAccessToken from './store/actionCreaters/setAccessToken';

//@ts-ignore
window.store = store


class App extends React.Component {
  clientId = "6f3bf4f36b1344e7bafc166cf7600ea4"
  clientSecret = "2c4a12c7aee04fecb925d0c29575bbf9"
  
  getToken(){
  
    const result = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
  .then(data => data.json())
    return result
  }

  componentDidMount() {
    this.getToken()
    .then(data => store.dispatch(setAccessToken(data.access_token)))
  }
  render() {

    return (
      <Provider store={store}>
        <Route component={MainPage} />
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


