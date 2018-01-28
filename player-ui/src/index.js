import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

const ApplicationInstance = <App storage={window.localStorage} />;

ReactDOM.render(ApplicationInstance, document.getElementById('root'));
//registerServiceWorker();
