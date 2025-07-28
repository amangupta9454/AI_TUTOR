import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [careerToolsOpen, setCareerToolsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  // Monitor authentication status changes
  useEffect(() => {
    setIsVisible(true);
    
    // Add event listener for storage changes (for cross-tab sync)
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check token periodically
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setCareerToolsOpen(false);
    }
  };

  const toggleCareerTools = () => {
    setCareerToolsOpen(!careerToolsOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setMenuOpen(false);
    navigate('/login');
    window.dispatchEvent(new Event('storage')); // Trigger storage event
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    {
      name: 'Career Tools',
      subLinks: [
        { name: 'Career Path', to: '/career' },
        { name: 'Resume Builder', to: '/resume' },
        { name: 'Career Analyzer', to: '/carreranalyzer' },
        { name: 'LinkedIn Optimizer', to: '/linkedin' },
        { name: 'Skill Analyzer', to: '/skillanalyzer' },
      ],
    },
    { name: 'Contact', to: '/contact' },
    ...(isAuthenticated ? [{ name: 'Dashboard', to: '/dashboard' }] : [{ name: 'Login', to: '/login' }]),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      <div className="backdrop-blur-xl bg-[#020617]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <div
            className="text-3xl font-bold tracking-wide bg-gray-300 text-transparent bg-clip-text"
            style={{ fontFamily: "'Rowdies', sans-serif", fontWeight: '500' }}
          >
            AI_Career
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <div className="relative">
                    <div
                      className="flex items-center text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out cursor-pointer"
                    >
                      {link.name}
                      <FiChevronDown className="ml-1" />
                    </div>
                    <div
                      className="absolute left-0 mt-2 w-48 bg-[#0f172a]/95 backdrop-blur-md border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-300 ease-in-out z-10"
                    >
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.to}
                          className="block px-4 py-2 text-gray-200 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-200"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className="relative text-gray-300 hover:text-white font-medium group transition duration-300 ease-in-out"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
                  </Link>
                )}
              </div>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-3xl text-gray-300 hover:text-white transition"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0f172a]/90 backdrop-blur-md border-t border-gray-700 px-6 py-4 space-y-3 animate-slide-down">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <div>
                    <button
                      onClick={toggleCareerTools}
                      className="flex items-center justify-between w-full text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
                    >
                      {link.name}
                      <FiChevronDown 
                        className={`transition-transform duration-300 ${
                          careerToolsOpen ? 'rotate-180' : 'rotate-0'
                        }`} 
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      careerToolsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-2 space-y-2">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.to}
                            onClick={() => setMenuOpen(false)}
                            className="block pl-4 py-1 text-gray-300 hover:text-white text-base font-medium tracking-wide transition-all duration-200 hover:bg-gray-700/30 rounded-md"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;