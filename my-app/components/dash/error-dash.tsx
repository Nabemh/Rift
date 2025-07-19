interface ErrorScreenProps {
    errorMessage: string
  }
  
  export function ErrorScreen({ errorMessage }: ErrorScreenProps) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col min-h-0">
          <main className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                <h3 className="text-sm font-medium text-red-800 mb-2">Connection Error</h3>
                <p className="text-xs text-red-600 mb-3">{errorMessage}</p>
                <p className="text-xs text-gray-600 mb-3">
                  Make sure your FastAPI server is running on <code>http://localhost:8000</code>
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
  