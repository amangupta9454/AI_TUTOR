import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount and update
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    ...(isAuthenticated
      ? [
          { name: 'Dashboard', to: '/dashboard' },
          { name: 'Contact', to: '/contact' },
           { name: 'Interview Prep', to: '/interview-prep' },
          { name: 'Email Generator', to: '/email' },
          { name: 'Career Path', to: '/career' },
          {name: "Resume builder", to: "/resume"},
        ]
      : [
          { name: 'Career Path', to: '/career' },
           {name: "Resume builder", to: "/resume"},
          { name: 'Login', to: '/login' },
          { name: 'Contact', to: '/contact' },

         
        ]),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      <div className="backdrop-blur-xl bg-[#020617]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          {/* <div className="text-3xl font-semibold italic tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 text-transparent bg-clip-text">
            Ai_Career
          </div> */}
          <div className="text-3xl font-bold tracking-wide bg-gray-300 text-transparent bg-clip-text"
            style={{ fontFamily: "'Rowdies', sans-serif",
              fontWeight: '500',
            }}>

            AI_Career
          </div>
          

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="relative text-gray-300 hover:text-white font-medium group transition duration-300 ease-in-out"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
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
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
              >
                {link.name}
              </Link>
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