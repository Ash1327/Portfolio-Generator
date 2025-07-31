import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaPlus, FaTrash, FaArrowLeft, FaArrowRight, FaCheck, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { apiService } from '../services/api';
import { Template, FormData, FormStep } from '../types';

const PortfolioForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<FormStep>('hero');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<FormData>({
    hero: {
      name: '',
      title: '',
      tagline: '',
      image: null
    },
    about: {
      bio: '',
      email: '',
      phone: '',
      location: '',
      socials: {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
      }
    },
    skills: [''],
    services: [
      {
        title: '',
        description: ''
      },
      {
        title: '',
        description: ''
      },
      {
        title: '',
        description: ''
      }
    ],
    portfolio: [
      {
        title: '',
        description: '',
        image: null
      },
      {
        title: '',
        description: '',
        image: null
      },
      {
        title: '',
        description: '',
        image: null
      }
    ],
    testimonials: [
      {
        name: '',
        quote: '',
        position: ''
      }
    ],
    blog: {
      title: '',
      summary: ''
    },
    contact: {
      message: '',
      email: '',
      phone: ''
    }
  });

  useEffect(() => {
    // Get template from location state or localStorage
    const template = location.state?.selectedTemplate || 
      JSON.parse(localStorage.getItem('selectedTemplate') || 'null');
    
    if (template) {
      setSelectedTemplate(template);
    } else {
      // Redirect to template selection if no template is selected
      navigate('/');
    }
  }, [location.state, navigate]);

  const steps: FormStep[] = ['hero', 'about', 'skills', 'services', 'portfolio', 'testimonials', 'blog', 'contact'];
  const currentStepIndex = steps.indexOf(currentStep);

  const handleInputChange = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section: keyof FormData, nestedSection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...(prev[section] as any)[nestedSection],
          [field]: value
        }
      }
    }));
  };

  const handleImageUpload = (section: 'hero' | 'portfolio', field: string, file: File | null, index?: number) => {
    if (section === 'hero') {
      setFormData(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          [field]: file
        }
      }));
    } else if (section === 'portfolio' && index !== undefined) {
      setFormData(prev => ({
        ...prev,
        portfolio: prev.portfolio.map((project, i) => 
          i === index ? { ...project, [field]: file } : project
        )
      }));
    }
  };

  const handleSkillsChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const handlePortfolioChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', quote: '', position: '' }]
    }));
  };

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Show loading state
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Creating Portfolio...';
        submitButton.setAttribute('disabled', 'true');
      }

      // Prepare files array for API
      const files: File[] = [];
      
      // Add profile image
      if (formData.hero.image) {
        files.push(formData.hero.image);
      }
      
      // Add portfolio images
      formData.portfolio.forEach(project => {
        if (project.image) {
          files.push(project.image);
        }
      });

      // Create portfolio data without File objects
      const portfolioData = {
        hero: {
          name: formData.hero.name,
          title: formData.hero.title,
          tagline: formData.hero.tagline
        },
        about: formData.about,
        skills: formData.skills.filter(skill => skill.trim() !== ''),
        services: formData.services.filter(service => service.title.trim() !== ''),
        portfolio: formData.portfolio.filter(project => project.title.trim() !== ''),
        testimonials: formData.testimonials.filter(testimonial => testimonial.name.trim() !== ''),
        blog: formData.blog,
        contact: formData.contact,
        template: selectedTemplate?.id || 'modern' // Include template information
      };

      console.log('Submitting portfolio data:', portfolioData);
      console.log('Files to upload:', files.length);
      
      const result = await apiService.createPortfolio(portfolioData, files);
      console.log('Portfolio created successfully:', result);
      navigate('/success');
    } catch (error: any) {
      console.error('Error creating portfolio:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Error creating portfolio. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      // Reset button state
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Create Portfolio';
        submitButton.removeAttribute('disabled');
      }
    }
  };

  const renderHeroSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Hero Section</h2>
        <p className="text-gray-600 mb-8">Tell us about yourself and your professional identity</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.hero.name}
              onChange={(e) => handleInputChange('hero', 'name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title</label>
            <input
              type="text"
              value={formData.hero.title}
              onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full Stack Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
            <input
              type="text"
              value={formData.hero.tagline}
              onChange={(e) => handleInputChange('hero', 'tagline', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Passionate about creating amazing experiences"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Profile Image</label>
          <div className="flex items-center gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-blue-400 transition-colors duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('hero', 'image', e.target.files?.[0] || null)}
                className="hidden"
                id="profile-image"
              />
              <label htmlFor="profile-image" className="cursor-pointer">
                {formData.hero.image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(formData.hero.image)}
                      alt="Profile preview"
                      className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-blue-200"
                    />
                    <p className="text-green-600 text-xs mt-1">✓ Uploaded</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                      <FaUser className="text-xl text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Upload</p>
                  </div>
                )}
              </label>
            </div>
            {formData.hero.image && (
              <button
                type="button"
                onClick={() => handleImageUpload('hero', 'image', null)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
        <p className="text-gray-600 mb-8">Share your story and contact information</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
          <textarea
            value={formData.about.bio}
            onChange={(e) => handleInputChange('about', 'bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your professional journey, passion, and what drives you..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.about.email}
              onChange={(e) => handleInputChange('about', 'email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.about.phone}
              onChange={(e) => handleInputChange('about', 'phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.about.location}
              onChange={(e) => handleInputChange('about', 'location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Social Media Links</label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">GitHub</label>
              <input
                type="url"
                value={formData.about.socials.github}
                onChange={(e) => handleNestedInputChange('about', 'socials', 'github', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.about.socials.linkedin}
                onChange={(e) => handleNestedInputChange('about', 'socials', 'linkedin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Twitter</label>
              <input
                type="url"
                value={formData.about.socials.twitter}
                onChange={(e) => handleNestedInputChange('about', 'socials', 'twitter', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://twitter.com/username"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Website</label>
              <input
                type="url"
                value={formData.about.socials.website}
                onChange={(e) => handleNestedInputChange('about', 'socials', 'website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
        <p className="text-gray-600 mb-8">List your technical skills and expertise</p>
      </div>

      <div className="space-y-4">
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-4">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillsChange(index, e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Skill ${index + 1}`}
            />
            {formData.skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-2xl transition-all duration-300"
              >
                <FaTrash className="text-sm" />
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-2xl transition-all duration-300"
        >
          <FaPlus className="text-sm" />
          Add Skill
        </button>
      </div>
    </div>
  );

  const renderServicesSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Services</h2>
        <p className="text-gray-600 mb-8">Describe the services you offer (3 services)</p>
      </div>

      <div className="space-y-6">
        {formData.services.map((service, index) => (
          <div key={index} className="bg-gray-50 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service {index + 1}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what this service includes and how it benefits clients..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolioSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Portfolio</h2>
        <p className="text-gray-600 mb-8">Showcase your best projects (3 projects)</p>
      </div>

      <div className="space-y-6">
        {formData.portfolio.map((project, index) => (
          <div key={index} className="bg-gray-50 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Project {index + 1}</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="E-commerce Website"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Image</label>
                <div className="flex items-center gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-blue-400 transition-colors duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('portfolio', 'image', e.target.files?.[0] || null, index)}
                      className="hidden"
                      id={`project-image-${index}`}
                    />
                    <label htmlFor={`project-image-${index}`} className="cursor-pointer">
                      {project.image ? (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(project.image)}
                            alt="Project preview"
                            className="w-16 h-16 rounded-lg mx-auto object-cover border-2 border-blue-200"
                          />
                          <p className="text-green-600 text-xs mt-1">✓ Uploaded</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                            <FaPlus className="text-xl text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Upload</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {project.image && (
                    <button
                      type="button"
                      onClick={() => handleImageUpload('portfolio', 'image', null, index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your project, the challenges you faced, and the solutions you implemented..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Testimonials</h2>
        <p className="text-gray-600 mb-8">Add client testimonials (1-3 testimonials)</p>
      </div>

      <div className="space-y-6">
        {formData.testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-50 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Testimonial {index + 1}</h3>
              {formData.testimonials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all duration-300"
                >
                  <FaTrash className="text-sm" />
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Position/Company</label>
                <input
                  type="text"
                  value={testimonial.position}
                  onChange={(e) => handleTestimonialChange(index, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="CEO, Tech Company"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quote</label>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share what the client said about your work..."
                />
              </div>
            </div>
          </div>
        ))}
        
        {formData.testimonials.length < 3 && (
          <button
            type="button"
            onClick={addTestimonial}
            className="flex items-center gap-2 px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-2xl transition-all duration-300"
          >
            <FaPlus className="text-sm" />
            Add Testimonial
          </button>
        )}
      </div>
    </div>
  );

  const renderBlogSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Blog</h2>
        <p className="text-gray-600 mb-8">Share your latest blog post or article</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
          <input
            type="text"
            value={formData.blog.title}
            onChange={(e) => handleInputChange('blog', 'title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Latest Trends in Web Development"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Summary (Optional)</label>
          <textarea
            value={formData.blog.summary}
            onChange={(e) => handleInputChange('blog', 'summary', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief summary of your blog post..."
          />
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact</h2>
        <p className="text-gray-600 mb-8">Set up your contact information</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Message</label>
          <textarea
            value={formData.contact.message}
            onChange={(e) => handleInputChange('contact', 'message', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write a message that will be displayed on your contact page..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
            <input
              type="tel"
              value={formData.contact.phone}
              onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'hero':
        return renderHeroSection();
      case 'about':
        return renderAboutSection();
      case 'skills':
        return renderSkillsSection();
      case 'services':
        return renderServicesSection();
      case 'portfolio':
        return renderPortfolioSection();
      case 'testimonials':
        return renderTestimonialsSection();
      case 'blog':
        return renderBlogSection();
      case 'contact':
        return renderContactSection();
      default:
        return null;
    }
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <FaArrowLeft className="text-lg" />
              <span>Back to Templates</span>
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Create Your Portfolio
          </h1>
          <p className="text-xl text-gray-600">
            Fill in your information to create a stunning portfolio with the {selectedTemplate.name} template
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index <= currentStepIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStepIndex ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              currentStepIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaArrowLeft className="text-sm" />
            Previous
          </button>

          {currentStepIndex === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-300"
            >
              <FaCheck className="text-sm" />
              Create Portfolio
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-300"
            >
              Continue
              <FaArrowRight className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm; 