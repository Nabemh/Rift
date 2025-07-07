"use client";

import { FileText, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const router = useRouter();

const handleClick = () => {
    router.push('/dashboard');
}

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">Threat Intelligence Platform</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Threat Dataset</h2>
          <p className="text-lg text-gray-600">
            Analyze your security data with our AI-powered threat detection system
          </p>
        </div>

        {/* Upload Card */}
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">

            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-900">
                {file ? file.name : 'Drag and drop your file here'}
              </p>
              <p className="text-sm text-gray-500">
                {file ? 'File ready for analysis' : 'CSV, JSON, or TXT files (Max 100MB)'}
              </p>
            </div>

            <label className="cursor-pointer">
              <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Select File
                <input 
                  type="file" 
                  className="sr-only" 
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  accept=".csv,.json,.txt"
                />
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleClick}
            disabled={!file}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${file ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Run Analysis
          </button>

          {file && (
            <button
              onClick={() => setFile(null)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear File
            </button>
          )}
        </div>

        {/* File Preview (when file is selected) */}
        {file && (
          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <div className="flex items-start">
              <FileText className="h-6 w-6 text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">File Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Filename:</span> {file.name}</p>
                  <p><span className="font-medium">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><span className="font-medium">Type:</span> {file.type || file.name.split('.').pop()?.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}