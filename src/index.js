import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index-media.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

const Index = () => (
    <App />
);
  
ReactDOM.render( <Index />, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
