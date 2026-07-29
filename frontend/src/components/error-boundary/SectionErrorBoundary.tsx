import React from 'react';

interface SectionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionName?: string;
}

export class SectionErrorBoundary extends React.Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`SectionErrorBoundary [${this.props.sectionName || 'unknown'}]:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-xl p-8">
          <div className="text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-gray-600 text-sm font-medium mb-2">
              {this.props.sectionName || 'This section'} is temporarily unavailable
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="text-blue-accent text-sm font-semibold hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
