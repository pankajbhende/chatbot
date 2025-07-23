import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
