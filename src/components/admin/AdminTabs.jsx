
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, MessageSquare, Users, LogOut } from 'lucide-react';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab.jsx';
import ScheduleTab from '@/components/admin/ScheduleTab.jsx';
import AdminChat from '@/components/AdminChat.jsx';
import UserManagement from '@/components/UserManagement.jsx';

const AdminTabs = ({ currentUser, onLogout }) => {
  if (!currentUser) {
    return <p className="text-red-500 text-center py-4">Access Denied. Please log in.</p>;
  }

  return (
    <Tabs defaultValue="announcements" className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-gray-800 p-1 flex-grow">
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
          {currentUser?.role === 'owner' && (
            <TabsTrigger value="users" className="minecraft-btn data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
          )}
        </TabsList>
        <Button onClick={onLogout} variant="destructive" className="minecraft-btn-red ml-4">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <TabsContent value="announcements" className="mt-6">
        <AnnouncementsTab currentUser={currentUser} />
      </TabsContent>

      <TabsContent value="schedule" className="mt-6">
        <ScheduleTab currentUser={currentUser} />
      </TabsContent>

      <TabsContent value="chat" className="mt-6">
        <AdminChat currentUser={currentUser} />
      </TabsContent>

      {currentUser?.role === 'owner' && (
        <TabsContent value="users" className="mt-6">
          <UserManagement currentUser={currentUser} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default AdminTabs;
