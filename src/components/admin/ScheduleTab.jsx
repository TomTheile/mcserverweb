
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ScheduleTab = ({ currentUser }) => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    const savedSchedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    setSchedules(savedSchedules);
  }, []);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  const handleAddSchedule = () => {
    if (newSchedule.title && newSchedule.date && currentUser) {
      const schedule = {
        id: Date.now(),
        ...newSchedule,
        timestamp: new Date().toISOString(),
        author: currentUser.username
      };
      setSchedules(prev => [schedule, ...prev]);
      setNewSchedule({ title: '', date: '', description: '' });
      toast({
        title: "Event Scheduled",
        description: "The event has been successfully added to the schedule.",
      });
    } else if (!currentUser) {
       toast({
        title: "Error",
        description: "You must be logged in to schedule events.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title and date for the event.",
        variant: "destructive"
      });
    }
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been successfully removed from the schedule.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div>
          <Label htmlFor="title" className="text-gray-300">Title</Label>
          <Input
            id="title"
            placeholder="Event Title"
            value={newSchedule.title}
            onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
            className="minecraft-input bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="date" className="text-gray-300">Date & Time</Label>
          <Input
            id="date"
            type="datetime-local"
            value={newSchedule.date}
            onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
            className="minecraft-input bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="description" className="text-gray-300">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="Event Description"
            value={newSchedule.description}
            onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
            className="minecraft-input bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <Button onClick={handleAddSchedule} className="minecraft-btn w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="space-y-4 mt-6 max-h-[400px] overflow-y-auto pr-2">
        {schedules.length === 0 && (
          <p className="text-gray-400 text-center">No scheduled events yet.</p>
        )}
        {schedules.map((schedule) => (
          <motion.div
            key={schedule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="minecraft-container p-4 bg-gray-800 border border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">{schedule.title}</h3>
                <p className="text-sm text-yellow-400">
                  {new Date(schedule.date).toLocaleString()}
                </p>
                {schedule.description && <p className="text-gray-300 mt-2">{schedule.description}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Scheduled by {schedule.author} on {new Date(schedule.timestamp).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteSchedule(schedule.id)}
                className="minecraft-btn-red ml-4 flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTab;
