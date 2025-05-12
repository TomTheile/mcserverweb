
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, ListChecks, Image as ImageIcon, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="mr-2 h-4 w-4 sm:hidden md:inline-block" /> },
    { name: 'Features', href: '/features', icon: <ListChecks className="mr-2 h-4 w-4 sm:hidden md:inline-block" /> },
    { name: 'Gallery', href: '/gallery', icon: <ImageIcon className="mr-2 h-4 w-4 sm:hidden md:inline-block" /> },
    { name: 'Rules', href: '/rules', icon: <ScrollText className="mr-2 h-4 w-4 sm:hidden md:inline-block" /> }, 
    { name: 'Discord', hrefExternal: 'https://discord.gg/szBtDmdkT4', target: '_blank' },
  ];

  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/fae7a833-6503-44b1-a27f-9d0850a5d6a8/34f09e1d07d9238112246ac98d3fb6c6.png";
  const activeStyle = "text-green-400 border-b-2 border-green-400";
  const baseStyle = "text-gray-300 hover:text-green-400 transition-colors duration-200 minecraft-font text-sm py-1";


  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 bg-opacity-95 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" aria-label="VampirismExtra Server Home">
              <img src={logoUrl} alt="VampirismExtra Logo" className="h-10 md:h-12" />
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => 
              link.hrefExternal ? (
                <motion.a
                  key={index}
                  href={link.hrefExternal}
                  target={link.target}
                  rel="noopener noreferrer"
                  className={`${baseStyle} flex items-center`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ) : (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => `${baseStyle} flex items-center ${isActive ? activeStyle : ''}`}
                  >
                    {link.icon} {link.name}
                  </NavLink>
                </motion.div>
              )
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-800 border-t border-gray-700"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => 
                link.hrefExternal ? (
                  <a
                    key={index}
                    href={link.hrefExternal}
                    target={link.target}
                    rel="noopener noreferrer"
                    className={`${baseStyle} py-2 flex items-center`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon} {link.name}
                  </a>
                ) : (
                  <NavLink
                    key={index}
                    to={link.href}
                    className={({ isActive }) => `${baseStyle} py-2 flex items-center ${isActive ? 'text-green-400' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon} {link.name}
                  </NavLink>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
