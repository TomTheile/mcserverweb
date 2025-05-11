
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, MessageSquare, Users, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import AdminChat from '@/components/AdminChat';
import UserManagement from '@/components/UserManagement';
import AdminLogin from '@/components/AdminLogin';

const AdminPanel = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [announcements, setAnnouncements] = useState(() => {
    return JSON.parse(localStorage.getItem('announcements') || '[]');
  });
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [schedules, setSchedules] = useState(() => {
    return JSON.parse(localStorage.getItem('schedules') || '[]');
  });
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    description: ''
  });

  // Handle successful login
  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setShowLogin(false);
  };

  // Handle panel close
  const handlePanelClose = (value) => {
    if (!value) {
      setShowLogin(true);
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
    onOpenChange(value);
  };

  // Save to localStorage whenever data changes
  React.useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  React.useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim()) {
      const announcement = {
        id: Date.now(),
        text: newAnnouncement,
        timestamp: new Date().toISOString(),
        author: currentUser.username
      };
      setAnnouncements(prev => [...prev, announcement]);
      setNewAnnouncement('');
      toast({
        title: "Ankündigung erstellt",
        description: "Die Ankündigung wurde erfolgreich erstellt.",
      });
    }
  };

  const handleAddSchedule = () => {
    if (newSchedule.title && newSchedule.date) {
      const schedule = {
        id: Date.now(),
        ...newSchedule,
        timestamp: new Date().toISOString(),
        author: currentUser.username
      };
      setSchedules(prev => [...prev, schedule]);
      setNewSchedule({ title: '', date: '', description: '' });
      toast({
        title: "Event geplant",
        description: "Das Event wurde erfolgreich zum Zeitplan hinzugefügt.",
      });
    }
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Ankündigung gelöscht",
      description: "Die Ankündigung wurde erfolgreich entfernt.",
    });
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Event gelöscht",
      description: "Das Event wurde erfolgreich aus dem Zeitplan entfernt.",
    });
  };

  if (showLogin) {
    return <AdminLogin open={open} onOpenChange={handlePanelClose} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Dialog open={open} onOpenChange={handlePanelClose}>
      <DialogContent className="sm:max-w-[900px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="minecraft-header text-2xl">
            Website Admin Panel - {currentUser?.username}
          </DialogTitle>
          <DialogDescription>
            Verwalte die Website-Inhalte und kommuniziere mit anderen Admins
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="announcements" className="mt-6">
          <TabsList className="grid grid-cols-4 gap-4 bg-gray-800 p-1">
            <TabsTrigger value="announcements" className="minecraft-btn">
              <Bell className="mr-2 h-4 w-4" />
              Ankündigungen
            </TabsTrigger>
            <TabsTrigger value="schedule" className="minecraft-btn">
              <Calendar className="mr-2 h-4 w-4" />
              Zeitplan
            </TabsTrigger>
            <TabsTrigger value="chat" className="minecraft-btn">
              <MessageSquare className="mr-2 h-4 w-4" />
              Admin-Chat
            </TabsTrigger>
            {currentUser?.role === 'owner' && (
              <TabsTrigger value="users" className="minecraft-btn">
                <Users className="mr-2 h-4 w-4" />
                Benutzer
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="announcements" className="mt-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Neue Ankündigung..."
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  className="minecraft-input flex-1"
                />
                <Button onClick={handleAddAnnouncement} className="minecraft-btn">
                  <Plus className="mr-2 h-4 w-4" />
                  Hinzufügen
                </Button>
              </div>

              <div className="space-y-4 mt-6">
                {announcements.map((announcement) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="minecraft-container flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white">{announcement.text}</p>
                      <p className="text-sm text-gray-400">
                        Von {announcement.author} am {new Date(announcement.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="minecraft-btn-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    placeholder="Event-Titel"
                    value={newSchedule.title}
                    onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                    className="minecraft-input"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Datum & Zeit</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                    className="minecraft-input"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Beschreibung</Label>
                  <Input
                    id="description"
                    placeholder="Event-Beschreibung"
                    value={newSchedule.description}
                    onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                    className="minecraft-input"
                  />
                </div>
                <Button onClick={handleAddSchedule} className="minecraft-btn">
                  <Plus className="mr-2 h-4 w-4" />
                  Event hinzufügen
                </Button>
              </div>

              <div className="space-y-4 mt-6">
                {schedules.map((schedule) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="minecraft-container"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white">{schedule.title}</h3>
                        <p className="text-sm text-gray-400">
                          Von {schedule.author} am {new Date(schedule.date).toLocaleString()}
                        </p>
                        <p className="text-gray-300 mt-2">{schedule.description}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteSchedule(schedule.id)}
                        className="minecraft-btn-red"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <AdminChat currentUser={currentUser} />
          </TabsContent>

          {currentUser?.role === 'owner' && (
            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
