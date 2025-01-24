import React from 'react';
import { useRouteError } from 'react-router-dom';

interface RouterError {
  message?: string;
  stack?: string;
}

const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as RouterError;

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong.</h1>
          {process.env.NODE_ENV === 'development' && (
            <div className="text-left">
              <p className="text-xl text-red-600 mb-2">{error.message}</p>
              <pre className="text-sm text-red-600">{error.stack}</pre>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorBoundary;
