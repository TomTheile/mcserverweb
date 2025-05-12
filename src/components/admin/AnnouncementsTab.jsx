
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AnnouncementsTab = ({ currentUser }) => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  useEffect(() => {
    const savedAnnouncements = JSON.parse(localStorage.getItem('announcements') || '[]');
    setAnnouncements(savedAnnouncements);
  }, []);

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim() && currentUser) {
      const announcement = {
        id: Date.now(),
        text: newAnnouncement,
        timestamp: new Date().toISOString(),
        author: currentUser.username
      };
      setAnnouncements(prev => [announcement, ...prev]);
      setNewAnnouncement('');
      toast({
        title: "Announcement Created",
        description: "The announcement has been successfully created.",
      });
    } else if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to create announcements.",
        variant: "destructive"
      });
    }
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been successfully removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="New announcement..."
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          className="minecraft-input flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
        <Button onClick={handleAddAnnouncement} className="minecraft-btn">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="space-y-4 mt-6 max-h-[400px] overflow-y-auto pr-2">
        {announcements.length === 0 && (
          <p className="text-gray-400 text-center">No announcements yet.</p>
        )}
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="minecraft-container flex justify-between items-start p-4 bg-gray-800 border border-gray-700"
          >
            <div>
              <p className="text-white">{announcement.text}</p>
              <p className="text-sm text-gray-400 mt-1">
                By {announcement.author} on {new Date(announcement.timestamp).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteAnnouncement(announcement.id)}
              className="minecraft-btn-red ml-4 flex-shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsTab;
