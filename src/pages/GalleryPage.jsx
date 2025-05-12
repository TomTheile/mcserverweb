
import React from 'react';
import { motion } from 'framer-motion';
import GallerySection from '@/components/GallerySection.jsx';

const GalleryPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="minecraft-header text-center mb-12"
        >
            Community Gallery
        </motion.h1>
        <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
            Explore amazing builds, epic moments, and creative screenshots shared by the VampirismExtra community. 
            Feel free to upload your own memorable experiences from the server!
        </p>
        <GallerySection />
      </div>
    </motion.div>
  );
};

export default GalleryPage;
