import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

const renderApp = () => {
  render (
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./components/App', renderApp)
  }
} 

renderApp();