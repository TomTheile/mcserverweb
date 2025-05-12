
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Twitch as DiscordIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/fae7a833-6503-44b1-a27f-9d0850a5d6a8/34f09e1d07d9238112246ac98d3fb6c6.png";
  
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Rules', href: '/rules' },
  ];

  const communityLinks = [
      { name: 'Discord', hrefExternal: 'https://discord.gg/szBtDmdkT4' },
      { name: 'Forum', href: '#' }, // Placeholder
      { name: 'Donate', href: '#' }, // Placeholder, or link to a donate page/modal
      { name: 'Contact', href: '#' }, // Placeholder
  ];


  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
             <Link to="/">
                <img src={logoUrl} alt="VampirismExtra Logo" className="h-10 mb-4" />
             </Link>
            <p className="text-gray-400 mb-4">
              A friendly Minecraft server with an active community and regular events. Powered by the Vampirism Extra modpack.
            </p>
            <div className="flex space-x-4">
              <a href="https://discord.gg/szBtDmdkT4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Discord Server">
                <DiscordIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter Profile">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub Repository">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="minecraft-font text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-green-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="minecraft-font text-white mb-4">Community</h4>
            <ul className="space-y-2">
              {communityLinks.map(link => (
                <li key={link.name}>
                  {link.hrefExternal ? (
                     <a href={link.hrefExternal} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                        {link.name}
                     </a>
                  ) : (
                    <Link to={link.href} className="text-gray-400 hover:text-green-400 transition-colors">
                        {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} VampirismExtra Server. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            This website is not affiliated with Mojang AB. Minecraft is a trademark of Mojang AB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
