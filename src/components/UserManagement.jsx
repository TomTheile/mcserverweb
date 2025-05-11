
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const UserManagement = () => {
  const { toast } = useToast();
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const getAdminUsers = () => {
    return JSON.parse(localStorage.getItem('adminUsers') || '{}');
  };

  const saveAdminUsers = (users) => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  };

  const handleAddUser = () => {
    if (newUser.username && newUser.password) {
      const adminUsers = getAdminUsers();

      if (adminUsers[newUser.username]) {
        toast({
          title: "Fehler",
          description: "Dieser Benutzername existiert bereits.",
          variant: "destructive"
        });
        return;
      }

      adminUsers[newUser.username] = {
        password: newUser.password,
        role: 'admin'
      };

      saveAdminUsers(adminUsers);
      setNewUser({ username: '', password: '' });

      toast({
        title: "Benutzer erstellt",
        description: `Admin-Benutzer "${newUser.username}" wurde erstellt.`
      });
    }
  };

  const handleDeleteUser = (username) => {
    const adminUsers = getAdminUsers();

    if (adminUsers[username].role === 'owner') {
      toast({
        title: "Fehler",
        description: "Der Owner-Account kann nicht gelöscht werden.",
        variant: "destructive"
      });
      return;
    }

    delete adminUsers[username];
    saveAdminUsers(adminUsers);

    toast({
      title: "Benutzer gelöscht",
      description: `Admin-Benutzer "${username}" wurde entfernt.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4">Neuen Admin erstellen</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="newUsername">Benutzername</Label>
            <Input
              id="newUsername"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="minecraft-input"
              placeholder="Neuer Benutzername"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">Passwort</Label>
            <Input
              id="newPassword"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="minecraft-input"
              placeholder="Passwort"
            />
          </div>
          <Button onClick={handleAddUser} className="minecraft-btn w-full">
            <UserPlus className="mr-2 h-5 w-5" />
            Admin hinzufügen
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Admin-Benutzer</h3>
        {Object.entries(getAdminUsers()).map(([username, data]) => (
          <motion.div
            key={username}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">{username}</p>
                <p className="text-sm text-gray-400">{data.role}</p>
              </div>
            </div>
            {data.role !== 'owner' && (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteUser(username)}
                className="minecraft-btn-red"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
