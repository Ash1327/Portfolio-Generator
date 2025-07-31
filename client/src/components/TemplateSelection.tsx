import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaPalette, FaCode, FaCheck, FaStar, FaRocket, FaCrown } from 'react-icons/fa';
import { Template } from '../types';

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Dynamic layout with sidebar navigation, glass morphism effects, and modern grid system',
      features: ['Sidebar Navigation', 'Glass Morphism', 'Grid Layout', 'Modern Icons'],
      preview: '', // Remove non-existent image path
      colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
      popular: true,
      icon: FaRocket,
      style: 'modern'
    },
    {
      id: 'classic',
      name: 'Classic Elegant',
      description: 'Centered layout with traditional typography, clean sections, and professional structure',
      features: ['Centered Layout', 'Serif Typography', 'Clean Sections', 'Professional Design'],
      preview: '', // Remove non-existent image path
      colors: ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6'],
      popular: false,
      icon: FaCrown,
      style: 'classic'
    }
  ];

  const handleTemplateSelect = (template: Template): void => {
    setSelectedTemplate(template);
  };

  const handleContinue = (): void => {
    console.log('Continue button clicked');
    console.log('Selected template:', selectedTemplate);
    
    if (selectedTemplate) {
      console.log('Navigating to form with template:', selectedTemplate);
      
      // Store template in localStorage as backup
      localStorage.setItem('selectedTemplate', JSON.stringify(selectedTemplate));
      
      try {
        navigate('/form', { state: { selectedTemplate } });
        console.log('Navigation called successfully');
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to window.location
        window.location.href = '/form';
      }
    } else {
      console.log('No template selected');
      alert('Please select a template first');
    }
  };

  const renderModernPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4 relative overflow-hidden">
      {/* Modern Layout - Hero Section with Sidebar */}
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 h-full relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center border-2 border-white/50">
              <FaRocket className="text-white text-lg" />
            </div>
            <div>
              <div className="text-white text-sm font-bold">John Doe</div>
              <div className="text-white/80 text-xs">Full Stack Developer</div>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-3 gap-3">
          {/* Left Sidebar */}
          <div className="col-span-1 space-y-2">
            <div className="h-3 bg-white/30 rounded-full"></div>
            <div className="h-3 bg-white/20 rounded-full"></div>
            <div className="h-3 bg-white/20 rounded-full"></div>
            <div className="h-8 bg-white/25 rounded-lg mt-3"></div>
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-2 space-y-2">
            <div className="h-4 bg-white/40 rounded-lg"></div>
            <div className="h-3 bg-white/30 rounded-full w-3/4"></div>
            <div className="h-3 bg-white/25 rounded-full w-1/2"></div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="h-6 bg-white/30 rounded-lg"></div>
              <div className="h-6 bg-white/25 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="w-8 h-1 bg-white/40 rounded-full"></div>
          <div className="w-8 h-1 bg-white/60 rounded-full"></div>
          <div className="w-8 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderClassicPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
      {/* Classic Layout - Centered Content */}
      <div className="bg-white rounded-lg shadow-sm p-4 h-full border border-gray-200 relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-400 mx-auto mb-2">
            <FaCrown className="text-gray-600 text-lg" />
          </div>
          <div className="font-serif">
            <div className="text-sm font-bold text-gray-800">John Doe</div>
            <div className="text-xs text-gray-600">Full Stack Developer</div>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-3">
          <div className="text-center">
            <div className="h-2 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-2 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center">
                <div className="w-4 h-4 bg-gray-300 rounded mx-auto mb-1"></div>
                <div className="h-1 bg-gray-200 rounded-full text-xs"></div>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-gray-300 rounded mx-auto mb-1"></div>
                <div className="h-1 bg-gray-200 rounded-full text-xs"></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="space-y-1">
              <div className="h-1 bg-gray-300 rounded-full"></div>
              <div className="h-1 bg-gray-200 rounded-full w-4/5"></div>
              <div className="h-1 bg-gray-200 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex justify-center gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full mb-8">
            <FaStar className="text-yellow-500 text-xl" />
            <span className="text-gray-700 font-medium">Create Your Professional Portfolio</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Choose Your Portfolio Template
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Select from our professionally designed templates to create your stunning portfolio
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {templates.map((template, index) => {
            const IconComponent = template.icon;
            return (
              <div
                key={template.id}
                className={`rounded-3xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 p-8 ${
                  template.style === 'modern'
                    ? 'bg-gradient-to-br from-white via-purple-50 to-pink-50 border border-purple-100'
                    : 'bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-gray-200'
                } ${
                  selectedTemplate?.id === template.id
                    ? template.style === 'modern'
                      ? 'border-purple-500 ring-4 ring-purple-400 ring-opacity-50 transform scale-105 shadow-2xl'
                      : 'border-blue-500 ring-4 ring-blue-400 ring-opacity-50 transform scale-105 shadow-2xl'
                    : 'hover:shadow-2xl'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
                onClick={() => handleTemplateSelect(template)}
              >
                {/* Template Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      template.style === 'modern'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700'
                    }`}>
                      <IconComponent className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{template.name}</h3>
                      {template.popular && (
                        <div className="flex items-center gap-2 mt-1">
                          <FaStar className="text-yellow-500 text-sm" />
                          <span className="text-sm text-gray-600 font-medium">Most Popular</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {selectedTemplate?.id === template.id && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  )}
                </div>

                {/* Template Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{template.description}</p>

                {/* Template Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {template.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          template.style === 'modern'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                            : 'bg-blue-600'
                        }`} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Color Palette:</h4>
                  <div className="flex gap-2">
                    {template.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Template Preview */}
                <div className="relative mb-6">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                    {template.style === 'modern' ? renderModernPreview() : renderClassicPreview()}
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-2xl flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <FaEye className="text-white text-2xl" />
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedTemplate?.id === template.id
                      ? template.style === 'modern'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : template.style === 'modern'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white'
                  }`}
                >
                  {selectedTemplate?.id === template.id ? 'Selected' : 'Select Template'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              selectedTemplate
                ? selectedTemplate.style === 'modern'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue with {selectedTemplate?.name || 'Template'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection; 