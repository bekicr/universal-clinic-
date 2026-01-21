import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPlusSquare, FaUserCircle, FaCalendarCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.2 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? 'top-4' : 'top-0 pt-6'
        }`}
      >
        <div 
          className={`relative w-[95%] max-w-7xl transition-all duration-300 flex items-center justify-between px-6 
            ${scrolled 
              ? 'py-3 bg-white/90 backdrop-blur-md shadow-xl rounded-full border border-gray-100/50' 
              : 'py-4 bg-transparent'
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className={`p-2 rounded-xl shadow-sm transition-all duration-300 ${scrolled ? 'bg-primary text-white' : 'bg-white text-primary shadow-lg'}`}>
              <FaPlusSquare className="text-xl" />
            </div>
            <span className={`text-xl font-extrabold tracking-tight ${scrolled ? 'text-gray-800' : 'text-white drop-shadow-md'}`}>
              UM Clinic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full backdrop-blur-[2px] border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-white text-primary shadow-md'
                    : scrolled 
                      ? 'text-gray-600 hover:text-primary hover:bg-gray-50' 
                      : 'text-white hover:bg-white/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="flex flex-col items-end leading-none hidden lg:flex">
                  <span className={`text-xs font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>{user.name}</span>
                  <span className={`text-[10px] uppercase tracking-wider opacity-70 ${scrolled ? 'text-gray-500' : 'text-blue-100'}`}>{user.role}</span>
                </div>
                
                <div className="relative group">
                  <Link 
                    to={user.role === 'ADMIN' ? '/admin' : '/patient-dashboard'}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 border-2 ${
                      scrolled 
                        ? 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary' 
                        : 'border-white/30 text-white hover:bg-white hover:text-primary'
                    }`}
                  >
                    <FaUserCircle className="text-xl" />
                  </Link>
                  
                  {/* Dropdown for Logout */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[150px] overflow-hidden">
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Login
              </Link>
            )}

            <Link
              to="/book-appointment"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${
                scrolled 
                  ? 'bg-primary text-white hover:bg-blue-600' 
                  : 'bg-white text-primary hover:bg-blue-50'
              }`}
            >
              <FaCalendarCheck />
              <span className="hidden lg:inline">Book Now</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 text-2xl transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-y-0 right-0 z-[60] w-[80%] max-w-sm bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <span className="text-lg font-extrabold text-gray-800">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-bold transition-all ${
                      location.pathname === link.path 
                        ? 'bg-blue-50 text-primary' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="my-4 border-gray-100" />
                
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <FaUserCircle className="text-2xl" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs font-semibold text-gray-500 uppercase">{user.role}</p>
                      </div>
                    </div>
                    
                    <Link 
                      to={user.role === 'ADMIN' ? '/admin' : '/patient-dashboard'}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-xl text-center font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      Dashboard
                    </Link>
                    
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full px-4 py-3 rounded-xl text-center font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-3 rounded-xl text-center font-bold text-gray-700 hover:bg-gray-50 border border-gray-200"
                  >
                    Login
                  </Link>
                )}
                
                <Link
                  to="/book-appointment"
                  onClick={() => setIsOpen(false)}
                  className="block w-full mt-4 px-4 py-4 rounded-xl text-center font-bold text-white bg-primary shadow-lg shadow-blue-200 active:scale-95 transition-all"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
