import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEye, FaTrash, FaSearch } from 'react-icons/fa';
import { apiService, getImageUrl } from '../services/api';
import { Portfolio } from '../types';

const ProfessionalsList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const filterPortfolios = useCallback((): void => {
    let filtered = portfolios;

    // Search by name or title
    if (searchTerm) {
      filtered = filtered.filter(portfolio => 
        portfolio.hero?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.hero?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all' && filterValue) {
      if (filterType === 'skills') {
        filtered = filtered.filter(portfolio =>
          portfolio.skills?.some(skill =>
            skill.toLowerCase().includes(filterValue.toLowerCase())
          )
        );
      } else if (filterType === 'role') {
        filtered = filtered.filter(portfolio =>
          portfolio.hero?.title?.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    }

    setFilteredPortfolios(filtered);
  }, [portfolios, searchTerm, filterType, filterValue]);

  useEffect(() => {
    filterPortfolios();
  }, [filterPortfolios]);

  const fetchPortfolios = async (): Promise<void> => {
    try {
      const data = await apiService.getAllPortfolios();
      setPortfolios(data);
      setFilteredPortfolios(data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      try {
        await apiService.deletePortfolio(id);
        fetchPortfolios();
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        alert('Error deleting portfolio. Please try again.');
      }
    }
  };

  const getSkillColor = (skill: string): string => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800'
    ];
    return colors[skill.length % colors.length];
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Professional Portfolios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing portfolios created by professionals from around the world
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="skills">Skills</option>
              <option value="role">Role</option>
            </select>

            {/* Filter Value */}
            <input
              type="text"
              placeholder={`Filter by ${filterType === 'skills' ? 'skill' : filterType === 'role' ? 'role' : '...'}`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredPortfolios.length} of {portfolios.length} portfolios
          </p>
        </div>

        {/* Portfolios Grid */}
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-20">
            <FaUser className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No portfolios found</h3>
            <p className="text-gray-600 mb-8">
              {searchTerm || filterValue 
                ? 'Try adjusting your search or filter criteria'
                : 'No portfolios have been created yet'
              }
            </p>
            <Link
              to="/form"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Create First Portfolio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPortfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Portfolio Header */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    {portfolio.profileImageId ? (
                      <img
                        src={getImageUrl(portfolio.profileImageId) || ''}
                        alt={portfolio.hero.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-200 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-lg sm:text-2xl text-gray-400" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{portfolio.hero.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600 truncate">{portfolio.hero.title}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                    {portfolio.about.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Skills:</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {portfolio.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getSkillColor(skill)}`}
                        >
                          {skill}
                        </span>
                      ))}
                      {portfolio.skills.length > 3 && (
                        <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-600">
                          +{portfolio.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Projects Count */}
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm text-gray-500">
                      {portfolio.portfolio.length} project{portfolio.portfolio.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex gap-2 sm:gap-3">
                    <Link
                      to={`/portfolio/${portfolio.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FaEye className="text-sm" />
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(portfolio.id)}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-2xl transition-all duration-300"
                      title="Delete portfolio"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList; 