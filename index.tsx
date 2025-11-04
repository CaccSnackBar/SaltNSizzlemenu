
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FullScreenMenu from './components/FullScreenMenu';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const AppRouter = () => {
  if (window.location.pathname.startsWith('/fullscreen')) {
    return <FullScreenMenu />;
  }
  return <App />;
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);