import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import 'tachyons';// tachyons will overwrite bootstrap if there is confilict
import './index.css'; // be careful the order of css, it is not safe to use all the third party css packages

ReactDOM.render(
	(<BrowserRouter>
		<App />
	</BrowserRouter>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
