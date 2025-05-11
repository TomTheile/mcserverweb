
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminPanel from '@/components/AdminPanel';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Galerie', href: '#' },
    { name: 'Regeln', href: '#' },
    { name: 'Discord', href: '#' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 bg-opacity-95 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-bold minecraft-font text-green-500">MeinServer</span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 minecraft-font"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
            <Button
              onClick={() => setShowAdminPanel(true)}
              className="minecraft-btn flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-800 border-t border-gray-700"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200 py-2 minecraft-font"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={() => {
                  setShowAdminPanel(true);
                  setIsOpen(false);
                }}
                className="minecraft-btn flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <AdminPanel open={showAdminPanel} onOpenChange={setShowAdminPanel} />
    </nav>
  );
};

export default Navbar;
