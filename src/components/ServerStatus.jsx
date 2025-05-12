
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';

const ServerStatus = () => {
  const [status, setStatus] = useState('offline');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  useEffect(() => {
    const checkServerStatus = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/play3.eternalzero.cloud:25680`);
        const data = await response.json();
        
        setStatus(data.online ? 'online' : 'offline');
        setLastUpdate(new Date());
      } catch (err) {
        console.error('Error fetching server status:', err);
        setError('Could not retrieve server status');
        setStatus('offline');
      } finally {
        setLoading(false);
      }
    };
    
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const formatLastUpdate = (date) => {
    if (!date) return '';
    const seconds = Math.round((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return 'just now';
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-seconds, 'second');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="minecraft-container flex items-center"
    >
      <Server className={`h-10 w-10 ${status === 'online' ? 'text-green-500' : 'text-red-500'} mr-4`} />
      <div>
        <h3 className="minecraft-subheader">Server Status</h3>
        {loading ? (
          <p className="text-gray-300">Checking status...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-gray-300">
                {status === 'online' ? 'Server is Online' : 'Server is Offline'}
              </span>
            </div>
            {lastUpdate && (
              <span className="text-xs text-gray-400 mt-1">
                Last updated: {formatLastUpdate(lastUpdate)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ServerStatus;
