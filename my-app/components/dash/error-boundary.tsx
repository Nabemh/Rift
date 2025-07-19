"use client"

import { Component, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Dashboard Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-32 text-red-600 bg-red-50 rounded-lg border border-red-200">
            <div className="text-center p-4">
              <p className="text-sm font-medium">Something went wrong</p>
              <p className="text-xs text-red-500 mt-1">{this.state.error?.message}</p>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="mt-2 text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}