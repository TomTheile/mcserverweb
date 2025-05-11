
import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="minecraft-card"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-gray-700 rounded-full">
          {icon}
        </div>
        <h3 className="minecraft-font text-xl text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
