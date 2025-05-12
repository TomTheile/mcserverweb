
import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard.jsx';
import { Users, Server, Map as MapIcon, Calendar } from 'lucide-react'; // Renamed Map to MapIcon to avoid conflict

const featuresData = [
  {
    title: "Survival",
    description: "Survive in our challenging world with unique biomes and hidden treasures.",
    icon: <MapIcon className="h-8 w-8 text-green-400" />,
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
  },
  {
    title: "Custom Modpack",
    description: "Experience VampirismExtra with unique mods and configurations tailored for fun.",
    icon: <Server className="h-8 w-8 text-red-400" />,
  },
  {
    title: "Active Staff",
    description: "Our dedicated staff team is always ready to help and ensure a fair gameplay.",
    icon: <Users className="h-8 w-8 text-teal-400" />,
  },
  {
    title: "Player Economy",
    description: "Engage in a dynamic player-driven economy with shops and trading.",
    icon: <Calendar className="h-8 w-8 text-orange-400" />,
  },
  {
    title: "Land Claiming",
    description: "Protect your builds and treasures with our easy-to-use land claiming system.",
    icon: <MapIcon className="h-8 w-8 text-lime-400" />,
  }
];

const FeaturesPage = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="minecraft-header text-center mb-12"
        >
          Server Features
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 text-lg mb-4">
            We are constantly working on adding new features and improving the server based on community feedback.
          </p>
          <p className="text-gray-400">
            Have an idea for a new feature? Let us know on our Discord server!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesPage;
