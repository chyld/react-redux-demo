import React from "react";
import ReactDOM from "react-dom";

import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import fetch from 'isomorphic-fetch';

import Ctr from "./counter.jsx";
const loggerMiddleware = createLogger();

function syncCounter(){
  return {type: 'INC_COUNTER'};
}

function receiveData(numbers){
  return {
    type: 'RX_DATA',
    numbers
  }
}

function asyncCounter(){
  return function(dispatch){
    setTimeout(function(){
      dispatch(syncCounter());
    }, 1000);
  }
}

function asyncQuote(symbol){
  return dispatch => {
    fetch(`https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16`)
    .then(response => response.json())
    .then(json => dispatch(receiveData(json.data)));
  }
}

function counter(state = {count: 0, numbers: []}, action) {
  switch (action.type) {
    case 'INC_COUNTER':
      return {count : state.count + 1, numbers: state.numbers};
    case 'RX_DATA':
    return {count : state.count, numbers: [...state.numbers, ...action.numbers]};
  default:
    return state;
  }
}

function mapValueToProps(state)  {
  return {
    value: state.count,
    nums: state.numbers
  };
}

function mapDispatchToProps(dispatch)
{
  return {
    syncIncrementCount: () => dispatch(syncCounter()),
    asyncIncrementCount: () => dispatch(asyncCounter()),
    asyncGetQuote: (symbol) => dispatch(asyncQuote(symbol))
  };
}

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

let store = finalCreateStore(counter);
let App = connect(mapValueToProps, mapDispatchToProps)(Ctr);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App>Awesome Counter++</App>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('root')
);
