import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaRocket } from 'react-icons/fa';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/professionals');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-4 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-6xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Portfolio Created Successfully!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Your professional portfolio has been created and is ready to showcase your work.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-green-600">
            <FaRocket className="text-xl" />
            <span className="font-semibold">Redirecting to portfolio list...</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-3000" 
                 style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 