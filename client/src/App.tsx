import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TemplateSelection from './components/TemplateSelection';
import PortfolioForm from './components/PortfolioForm';
import PortfolioPage from './components/PortfolioPage';
import ProfessionalsList from './components/ProfessionalsList';
import SuccessPage from './components/SuccessPage';
import TestPage from './components/TestPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/form" element={<PortfolioForm />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/professionals" element={<ProfessionalsList />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
};

export default App; 