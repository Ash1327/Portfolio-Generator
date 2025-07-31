import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { apiService, getImageUrl } from '../services/api';
import { Portfolio } from '../types';

const PortfolioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async (): Promise<void> => {
    if (!id) return;
    
    try {
      const data = await apiService.getPortfolioById(id);
      setPortfolio(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Portfolio not found');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPortfolio();
    }
  }, [id, fetchPortfolio]);

  // Determine template type (default to modern if not specified)
  const templateType = portfolio?.template || 'modern';
  const isModernTemplate = templateType === 'modern';

  // Theme configuration based on template
  const theme = {
    modern: {
      heroGradient: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
      heroOverlay: 'bg-black/20',
      accentColor: 'from-purple-500 to-pink-500',
      accentColorHover: 'hover:from-purple-600 hover:to-pink-600',
      cardBg: 'bg-white',
      cardBorder: 'border-gray-100',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      buttonPrimary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      buttonSecondary: 'bg-gray-900 hover:bg-gray-800',
      skillIcon: 'from-purple-500 to-pink-600',
      contactCard: 'from-purple-600 to-pink-600',
      contactCardLinkedIn: 'from-blue-600 to-blue-700',
      contactCardGithub: 'from-gray-800 to-gray-900'
    },
    classic: {
      heroGradient: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600',
      heroOverlay: 'bg-black/30',
      accentColor: 'from-blue-500 to-indigo-500',
      accentColorHover: 'hover:from-blue-600 hover:to-indigo-600',
      cardBg: 'bg-gray-50',
      cardBorder: 'border-gray-200',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-700',
      buttonPrimary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
      buttonSecondary: 'bg-gray-800 hover:bg-gray-900',
      skillIcon: 'from-blue-500 to-indigo-600',
      contactCard: 'from-blue-600 to-indigo-600',
      contactCardLinkedIn: 'from-blue-600 to-blue-700',
      contactCardGithub: 'from-gray-800 to-gray-900'
    }
  };

  const currentTheme = theme[templateType];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The portfolio you are looking for does not exist.'}</p>
          <Link to="/professionals" className="btn btn-primary">
            <FaArrowLeft />
            Back to Professionals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isModernTemplate ? 'bg-white' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`${isModernTemplate ? 'bg-white/90 backdrop-blur-xl' : 'bg-gray-50/90 backdrop-blur-xl'} shadow-lg sticky top-0 z-50 border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/professionals" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-300">
              <FaArrowLeft className="text-lg" />
              <span className="font-semibold">Back to Professionals</span>
            </Link>
            <div className="flex items-center gap-6">
              {portfolio.about?.socials?.github && (
                <a href={portfolio.about.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  <FaGithub className="text-xl" />
                </a>
              )}
              {portfolio.about?.socials?.linkedin && (
                <a href={portfolio.about.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-300">
                  <FaLinkedin className="text-xl" />
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className={`absolute inset-0 ${currentTheme.heroGradient}`}></div>
        <div className={`absolute inset-0 ${currentTheme.heroOverlay}`}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            <div className="text-white">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Available for opportunities</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                {portfolio.hero?.name || 'Professional'}
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-100">
                {portfolio.hero?.title || 'Professional'}
              </h2>
              <p className="text-xl md:text-2xl text-blue-50 mb-12 leading-relaxed">
                {portfolio.hero?.subtitle || 'Passionate about creating amazing experiences'}
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap gap-6">
                {portfolio.about?.socials?.email && (
                  <a href={`mailto:${portfolio.about.socials.email}`} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300">
                    <FaEnvelope className="text-lg" />
                    <span className="font-medium">{portfolio.about.socials.email}</span>
                  </a>
                )}
                {portfolio.about?.socials?.phone && (
                  <a href={`tel:${portfolio.about.socials.phone}`} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300">
                    <FaPhone className="text-lg" />
                    <span className="font-medium">{portfolio.about.socials.phone}</span>
                  </a>
                )}
                {portfolio.about?.socials?.location && (
                  <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl">
                    <FaMapMarkerAlt className="text-lg" />
                    <span className="font-medium">{portfolio.about.socials.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              {portfolio.profileImageId ? (
                <img
                  src={getImageUrl(portfolio.profileImageId) || ''}
                  alt={portfolio.hero.name}
                  className="w-80 h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              ) : (
                <div className="w-80 h-80 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/20 shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center mb-4">
                      <span className="text-6xl font-bold text-white">
                        {portfolio.hero.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white/80 font-medium">Profile Image</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-20 ${isModernTemplate ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black ${currentTheme.textPrimary} mb-6`}>About Me</h2>
            <p className={`text-xl ${currentTheme.textSecondary} max-w-4xl mx-auto leading-relaxed`}>
              {portfolio.about?.description || 'A passionate professional dedicated to creating amazing experiences.'}
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`py-20 ${isModernTemplate ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black ${currentTheme.textPrimary} mb-6`}>Skills & Expertise</h2>
            <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.skills.map((skill, index) => (
              <div
                key={index}
                className={`${currentTheme.cardBg} rounded-3xl shadow-lg p-8 border ${currentTheme.cardBorder} hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentTheme.skillIcon} rounded-2xl flex items-center justify-center`}>
                    <FaStar className="text-white text-xl" />
                  </div>
                  <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>{skill}</h3>
                </div>
                <p className={currentTheme.textSecondary}>
                  Proficient in {skill} with extensive experience in modern development practices.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className={`py-20 ${isModernTemplate ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black ${currentTheme.textPrimary} mb-6`}>Featured Projects</h2>
            <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
              A showcase of my recent work and creative projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.portfolio.map((project, index) => (
              <div
                key={index}
                className={`${currentTheme.cardBg} rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}
              >
                {project.imageId && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getImageUrl(project.imageId) || ''}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>{project.title}</h3>
                  <p className={`${currentTheme.textSecondary} mb-6 leading-relaxed`}>{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className={`font-semibold ${currentTheme.textPrimary} mb-3`}>Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-3 py-1 ${isModernTemplate ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'} rounded-full text-sm font-medium`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 ${currentTheme.buttonSecondary} text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        <FaGithub className="text-sm" />
                        View Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 ${currentTheme.buttonPrimary} text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        <FaStar className="text-sm" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 ${isModernTemplate ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black ${currentTheme.textPrimary} mb-6`}>Let's Connect</h2>
            <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
              Ready to collaborate on your next project? Let's discuss how we can work together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.about?.socials?.email && (
              <a
                href={`mailto:${portfolio.about.socials.email}`}
                className={`bg-gradient-to-br ${currentTheme.contactCard} text-white p-8 rounded-3xl text-center hover:shadow-xl transition-all duration-300`}
              >
                <FaEnvelope className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-blue-100">{portfolio.about.socials.email}</p>
              </a>
            )}
            
            {portfolio.about?.socials?.linkedin && (
              <a
                href={portfolio.about.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br ${currentTheme.contactCardLinkedIn} text-white p-8 rounded-3xl text-center hover:shadow-xl transition-all duration-300`}
              >
                <FaLinkedin className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
                <p className="text-blue-100">Connect professionally</p>
              </a>
            )}
            
            {portfolio.about?.socials?.github && (
              <a
                href={portfolio.about.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br ${currentTheme.contactCardGithub} text-white p-8 rounded-3xl text-center hover:shadow-xl transition-all duration-300`}
              >
                <FaGithub className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">GitHub</h3>
                <p className="text-gray-300">View my code</p>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage; 