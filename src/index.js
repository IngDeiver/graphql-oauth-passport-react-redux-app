import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App'
import { Provider } from "react-redux";
import store from './redux/store'
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <ApolloProvider client={client}>
      <App/>
     </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
