import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-4 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHome className="text-4xl text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test Page
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            This is a test page for development and debugging purposes.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Available Features:</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>✅ TypeScript conversion complete</li>
              <li>✅ API service with centralized configuration</li>
              <li>✅ Organized server routes and middleware</li>
              <li>✅ File upload functionality</li>
              <li>✅ Portfolio creation and management</li>
            </ul>
          </div>
          
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            <FaArrowLeft className="text-lg" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 