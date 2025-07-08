export default function Loading() {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-white border-r border-gray-200 animate-pulse">
          <div className="p-4 border-b border-gray-200">
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="p-4 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-white border-b border-gray-200 animate-pulse">
            <div className="h-full bg-gray-200"></div>
          </div>
          <div className="flex-1 p-6">
            <div className="grid grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-white border border-gray-200 rounded-lg animate-pulse">
                  <div className="h-full bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }