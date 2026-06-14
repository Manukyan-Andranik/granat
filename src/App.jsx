import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ITPage from './components/ITPage';

const serviceHashes = {
  '#/smm': 'smm',
  '#/marketing': 'marketing',
  '#/dooh': 'dooh',
  '#/branding': 'branding',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [initialService, setInitialService] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('granat_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/it') {
        setCurrentPage('it');
        setInitialService(null);
      } else {
        setCurrentPage('home');
        const serviceId = serviceHashes[hash] || null;
        setInitialService(serviceId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-granat-red/30 selection:text-white">
      {currentPage === 'home' ? (
        <HomePage initialService={initialService} />
      ) : (
        <ITPage />
      )}
    </div>
  );
}
