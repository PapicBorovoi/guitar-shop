import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { enableMapSet } from 'immer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMapSet();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
