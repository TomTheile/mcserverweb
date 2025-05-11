
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Users, Server, Map, Calendar, ChevronRight, Copy, ExternalLink, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServerStatus from '@/components/ServerStatus';
import FeatureCard from '@/components/FeatureCard';
import PlayerCount from '@/components/PlayerCount';
import JoinModal from '@/components/JoinModal';
import GallerySection from '@/components/GallerySection';
import DonateButton from '@/components/DonateButton';

function App() {
  const { toast } = useToast();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [serverAddress] = useState('play3.eternalzero.cloud:25680');
  
  const copyServerAddress = () => {
    navigator.clipboard.writeText(serverAddress);
    toast({
      title: "Server Address Copied!",
      description: "The server address has been copied to your clipboard.",
      duration: 3000,
    });
  };

  const features = [
    {
      title: "Survival",
      description: "Survive in our challenging world with unique biomes and hidden treasures.",
      icon: <Map className="h-8 w-8 text-green-400" />,
    },
    {
      title: "Friendly Community",
      description: "Join our growing player community and make new friends.",
      icon: <Users className="h-8 w-8 text-blue-400" />,
    },
    {
      title: "Regular Events",
      description: "Participate in weekly events and win exclusive rewards.",
      icon: <Calendar className="h-8 w-8 text-yellow-400" />,
    },
    {
      title: "High Performance",
      description: "Enjoy a lag-free gaming experience with our optimized server infrastructure.",
      icon: <Server className="h-8 w-8 text-purple-400" />,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 minecraft-pattern">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" alt="Minecraft landscape" src="https://images.unsplash.com/photo-1585061047852-aa84e7e4ccdc" />
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
                onClick={() => setShowJoinModal(true)}
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
      
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="minecraft-header text-center mb-12"
          >
            Server Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <GallerySection />
      
      <section className="py-16 bg-gray-900 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img className="w-full h-full object-cover" alt="Minecraft night sky" src="https://images.unsplash.com/photo-1697719307542-adb131711d27" />
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
                onClick={() => setShowJoinModal(true)}
                className="minecraft-btn text-lg px-8 py-3 flex items-center"
              >
                Join Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <DonateButton />
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      <JoinModal open={showJoinModal} onOpenChange={setShowJoinModal} serverAddress={serverAddress} />
      <Toaster />
    </div>
  );
}

export default App;
