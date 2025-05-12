
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminLogin = ({ open, onOpenChange, onLoginSuccess }) => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getAdminUsers = () => {
    const savedUsers = localStorage.getItem('adminUsers');
    if (!savedUsers) {
      const initialUsers = {
        'RedAngelsMC': {
          password: 't2344T78', // Default owner password
          role: 'owner'
        }
      };
      localStorage.setItem('adminUsers', JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(savedUsers);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const adminUsers = getAdminUsers();

    if (adminUsers[username] && adminUsers[username].password === password) {
      const user = {
        username,
        role: adminUsers[username].role
      };
      
      localStorage.setItem('loggedInAdminUser', JSON.stringify(user)); // Store logged-in user
      window.dispatchEvent(new Event('adminLoginSuccess')); // Notify other components

      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
      });

      onLoginSuccess(user);
      onOpenChange(false);
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect username or password.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="minecraft-header text-2xl text-center">Admin Login</DialogTitle>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mt-4"
          onSubmit={handleLogin}
        >
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="username"
                placeholder="Username"
                className="pl-10 minecraft-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="pl-10 minecraft-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full minecraft-btn">
            <Shield className="mr-2 h-5 w-5" />
            Login
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
