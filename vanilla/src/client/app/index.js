import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.scss';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    root
);