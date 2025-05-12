
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ChevronRight, Copy } from 'lucide-react';
import ServerStatus from '@/components/ServerStatus.jsx';
import PlayerCount from '@/components/PlayerCount.jsx';
import PublicChatDisplay from '@/components/PublicChatDisplay.jsx';
import DonateButton from '@/components/DonateButton.jsx';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const { toast } = useToast();
  const [serverAddress] = useState('play3.eternalzero.cloud:25680');
  const curseforgeLink = "https://www.curseforge.com/minecraft/modpacks/vampirism-extra";

  const copyServerAddress = () => {
    navigator.clipboard.writeText(serverAddress);
    toast({
      title: "Server Address Copied!",
      description: "The server address has been copied to your clipboard.",
      duration: 3000,
    });
  };

  const handleJoinNowClick = () => {
    window.open(curseforgeLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img  class="w-full h-full object-cover" alt="Minecraft landscape for hero section" src="https://images.unsplash.com/photo-1585061047852-aa84e7e4ccdc" />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="minecraft-font text-4xl md:text-6xl font-bold text-white mb-6">
              VampirismExtra Server
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join our friendly community and experience Minecraft in a unique world full of adventures!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                onClick={handleJoinNowClick}
                className="minecraft-btn text-lg px-8 py-3"
              >
                Join Now
              </Button>
              
              <div className="flex items-center bg-gray-800 bg-opacity-80 px-4 py-2 rounded-sm border-2 border-gray-700">
                <span className="text-white mr-2">{serverAddress}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={copyServerAddress}
                  className="text-gray-300 hover:text-white"
                  aria-label="Copy server address"
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <DonateButton />
            </div>
          </motion.div>
        </div>
        
        <div className="grass-top"></div>
        <div className="dirt-bg h-8"></div>
      </section>
      
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <ServerStatus />
            <PlayerCount />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-900 text-center">
          <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="minecraft-header mb-6"
              >
                Explore Our Features
              </motion.h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Discover unique gameplay, a vibrant community, and exciting events. Dive deeper into what makes VampirismExtra special!
              </p>
              <Link to="/features">
                <Button className="minecraft-btn text-lg px-8 py-3">
                  View All Features <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
          </div>
      </section>

      <PublicChatDisplay />
      
       <section className="py-16 bg-gray-800 text-center">
          <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="minecraft-header mb-6"
              >
                Community Gallery
              </motion.h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                See amazing creations and moments captured by our players. Share your own builds and experiences!
              </p>
              <Link to="/gallery">
                <Button className="minecraft-btn text-lg px-8 py-3">
                  Visit Gallery <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
          </div>
      </section>
      
      <section className="py-16 bg-gray-900 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img  class="w-full h-full object-cover" alt="Minecraft night sky for call to action" src="https://images.unsplash.com/photo-1585061047852-aa84e7e4ccdc" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="minecraft-header mb-6">Ready to Play?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join hundreds of players today and start your adventure on our server!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                onClick={handleJoinNowClick}
                className="minecraft-btn text-lg px-8 py-3 flex items-center"
              >
                Join Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <DonateButton />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
