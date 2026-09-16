import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in simulation:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
          <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-xl border border-rose-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Simulation Notice
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              The simulation encountered an unexpected edge-case. Click below to reload the lab smoothly.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Simulation</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
