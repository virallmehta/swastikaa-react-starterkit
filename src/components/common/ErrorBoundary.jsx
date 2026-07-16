import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@components/ui/Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Catch errors and set details for 404/500 or generic crashes
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Wire this up to Sentry/LogRocket/etc. in production.
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error ? this.state.error.message : "";
      
      // Check for Not Found (404) or Server Error (500)
      const is404 = errorMessage.includes("404") || errorMessage.includes("Not Found");
      const is500 = errorMessage.includes("500") || errorMessage.includes("Internal Server Error");

      if (is404) {
        return (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist or has been moved.</p>
            <button onClick={() => window.location.assign('/')}>Go back to Home</button>
          </div>
        );
      }

      if (is500) {
        return (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <h1>500 - Internal Server Error</h1>
            <p>Our server encountered an internal error and was unable to complete your request.</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        );
      }

      // Default fallback for other/unhandled errors with expandable technical details
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <h2>Something went wrong.</h2>
          <p>We're sorry, but an unexpected error occurred.</p>
          <details style={{ whiteSpace: 'pre-wrap', color: 'red', marginTop: '10px' }}>
            <summary>Click for error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
