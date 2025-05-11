
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Twitch as Discord } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="minecraft-font text-xl text-green-500 mb-4">MeinServer</h3>
            <p className="text-gray-400 mb-4">
              Ein freundlicher Minecraft-Server mit einer aktiven Community und regelmäßigen Events.
            </p>
            <div className="flex space-x-4">
              <a href="https://discord.gg/szBtDmdkT4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Discord className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="minecraft-font text-white mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Galerie</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Regeln</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="minecraft-font text-white mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="https://discord.gg/szBtDmdkT4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Spenden</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Kontakt</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} MeinServer. Alle Rechte vorbehalten.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Diese Website ist nicht mit Mojang verbunden.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
