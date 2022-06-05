import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './Components/App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const htmlRoot = document.getElementById('root');
if (htmlRoot) {
	const root = ReactDOM.createRoot(htmlRoot);
	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	);
} else throw new Error('Root container is not found');

reportWebVitals();
