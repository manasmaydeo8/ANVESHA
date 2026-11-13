// src/components/ui/ErrorBoundary.jsx
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground font-sans">
          <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 space-y-4 text-center">
            <span className="font-mono text-[11px] text-primary uppercase tracking-wider block">
              SPECIMEN RECOVERY
            </span>
            <h1 className="font-display text-[28px] text-foreground">
              A reading anomaly occurred.
            </h1>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              The guide encountered an unexpected render state. Local specimen data remains safe.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground font-mono text-[12px] uppercase tracking-wider hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Return to Index
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
