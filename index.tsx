import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ErrorBoundary Component to catch rendering errors and prevent a blank screen
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  // Fix: Replaced the constructor with a public class field for state initialization.
  // This is a more modern syntax for React class components and resolves TypeScript
  // errors where `this.state` and `this.props` were not correctly recognized.
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to the console for debugging.
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI if an error occurs
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#333', backgroundColor: '#e0e8e2', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);