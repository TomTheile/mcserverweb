
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4 bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Frown className="h-32 w-32 text-yellow-400 mb-8 mx-auto" />
        <h1 className="minecraft-header text-6xl mb-4">404</h1>
        <h2 className="minecraft-font text-3xl text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
          Oops! It seems like the page you're looking for has vanished into the void or never existed.
        </p>
        <Link to="/">
          <Button className="minecraft-btn text-lg px-8 py-3">
            Return to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
