
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const PlayerCount = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [playerList, setPlayerList] = useState([]);
  
  useEffect(() => {
    const fetchPlayerCount = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/play3.eternalzero.cloud:25680`);
        const data = await response.json();
        
        if (data.online) {
          setPlayerCount(data.players.online);
          setMaxPlayers(data.players.max);
          setPlayerList(data.players.list || []);
          setLastUpdate(new Date());
        } else {
          setPlayerCount(0);
          setMaxPlayers(0);
          setPlayerList([]);
        }
      } catch (err) {
        console.error('Fehler beim Abrufen der Spielerzahl:', err);
        setError('Konnte Spielerzahl nicht abrufen');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayerCount();
    // Aktualisiere alle 5 Sekunden
    const interval = setInterval(fetchPlayerCount, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const calculatePercentage = () => {
    if (maxPlayers === 0) return 0;
    return (playerCount / maxPlayers) * 100;
  };
  
  const formatLastUpdate = (date) => {
    if (!date) return '';
    return new Intl.RelativeTimeFormat('de').format(
      Math.round((date.getTime() - new Date().getTime()) / 1000),
      'seconds'
    );
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="minecraft-container"
    >
      <div className="flex items-center mb-2">
        <Users className="h-10 w-10 text-blue-400 mr-4" />
        <div>
          <h3 className="minecraft-subheader">Spieler online</h3>
          {loading ? (
            <p className="text-gray-300">Lade Spielerzahl...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div>
              <p className="text-gray-300">{playerCount} / {maxPlayers}</p>
              {lastUpdate && (
                <span className="text-xs text-gray-400">
                  Letzte Aktualisierung: {formatLastUpdate(lastUpdate)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {!loading && !error && (
        <>
          <div className="w-full bg-gray-700 rounded-sm h-4 mt-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${calculatePercentage()}%` }}
              transition={{ duration: 0.5 }}
              className="bg-blue-500 h-full rounded-sm"
            ></motion.div>
          </div>
          
          {playerList.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm text-gray-400 mb-2">Aktive Spieler:</h4>
              <div className="grid grid-cols-2 gap-2">
                {playerList.map((player, index) => (
                  <div 
                    key={index}
                    className="text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded-sm"
                  >
                    {player.name_clean || player.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default PlayerCount;
