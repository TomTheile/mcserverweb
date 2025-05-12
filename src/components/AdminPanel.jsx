
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Calendar, MessageSquare, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminLogin from '@/components/AdminLogin';
import AdminChat from '@/components/AdminChat';
import UserManagement from '@/components/UserManagement';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import ScheduleTab from '@/components/admin/ScheduleTab';

const AdminPanel = ({ open, onOpenChange }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInAdminUser'));
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
    } else {
      setCurrentUser(null);
      setShowLogin(true);
    }
  }, [open]); 

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowLogin(false);
    toast({
      title: "Admin Panel Access Granted",
      description: `Logged in as ${user.username}.`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInAdminUser');
    setCurrentUser(null);
    setShowLogin(true); 
    window.dispatchEvent(new Event('adminLogout')); 
    onOpenChange(false); 
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel.",
    });
  };
  
  const handlePanelClose = (value) => {
    onOpenChange(value);
    if (!value && !localStorage.getItem('loggedInAdminUser')) {
       setShowLogin(true); 
       setCurrentUser(null);
    }
  };


  if (showLogin) {
    return <AdminLogin open={open} onOpenChange={handlePanelClose} onLoginSuccess={handleLoginSuccess} />;
  }

  if (!currentUser) {
    return null; 
  }

  return (
    <Dialog open={open} onOpenChange={handlePanelClose}>
      <DialogContent className="sm:max-w-[900px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader className="flex flex-row justify-between items-center">
          <div>
            <DialogTitle className="minecraft-header text-2xl">
              Website Admin Panel - {currentUser.username} ({currentUser.role})
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Manage website content and communicate with other admins.
            </DialogDescription>
          </div>
          <Button onClick={handleLogout} variant="destructive" className="minecraft-btn-red">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </DialogHeader>

        <Tabs defaultValue="announcements" className="mt-6">
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-gray-800 p-1">
            <TabsTrigger value="announcements" className="minecraft-btn data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Bell className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="schedule" className="minecraft-btn data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="chat" className="minecraft-btn data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Admin Chat
            </TabsTrigger>
            {currentUser.role === 'owner' && (
              <TabsTrigger value="users" className="minecraft-btn data-[state=active]:bg-green-600 data-[state=active]:text-white">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="announcements" className="mt-6">
            <AnnouncementsTab currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <ScheduleTab currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <AdminChat currentUser={currentUser} />
          </TabsContent>

          {currentUser.role === 'owner' && (
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
