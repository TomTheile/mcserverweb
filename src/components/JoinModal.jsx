
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const JoinModal = ({ open, onOpenChange, serverAddress }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  const copyServerAddress = () => {
    navigator.clipboard.writeText(serverAddress);
    toast({
      title: "Server Address Copied!",
      description: "The server address has been copied to your clipboard.",
      duration: 3000,
    });
  };
  
  const steps = [
    {
      title: "Install Modpack",
      description: "Install the required Vampirism Extra Modpack from CurseForge.",
      image: "modpack-installation"
    },
    {
      title: "Start Minecraft",
      description: "Launch Minecraft Forge with the installed modpack.",
      image: "minecraft-forge"
    },
    {
      title: "Add Server",
      description: "Add our server address and join the server.",
      image: "minecraft-add-server"
    }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="minecraft-container max-w-2xl">
        <DialogHeader>
          <DialogTitle className="minecraft-header text-center">Join the Server</DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Follow these steps to join our Modded Minecraft Server
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <div className="flex justify-between mb-6">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-1/3 h-2 mx-1 rounded-full ${step === index + 1 ? 'bg-green-500' : 'bg-gray-600'}`}
              ></div>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="text-center mb-6">
                <h3 className="minecraft-font text-xl text-white mb-2">
                  Step {step}: {steps[step-1].title}
                </h3>
                <p className="text-gray-300">{steps[step-1].description}</p>
              </div>
              
              {step === 1 && (
                <div className="bg-gray-800 p-6 rounded-sm mb-6 text-center w-full">
                  <h4 className="text-white mb-4">Vampirism Extra Modpack</h4>
                  <a 
                    href="https://www.curseforge.com/minecraft/modpacks/vampirism-extra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minecraft-btn inline-flex items-center px-6 py-3"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Modpack
                  </a>
                </div>
              )}
              
              {step === 3 && (
                <div className="flex items-center justify-center bg-gray-800 p-3 rounded-sm mb-6 w-full">
                  <span className="text-white mr-2 minecraft-font">{serverAddress}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={copyServerAddress}
                    className="text-gray-300 hover:text-white"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              )}
              
              <div className="bg-gray-700 p-4 rounded-sm mb-6 w-full">
                <img  class="w-full h-auto rounded-sm border-2 border-gray-600" alt={`Minecraft ${steps[step-1].title} screenshot`} src="https://images.unsplash.com/photo-1644547933978-a79c34d5192a" />
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="minecraft-btn bg-gray-700 border-gray-900 hover:bg-gray-600"
            >
              Back
            </Button>
            
            {step < steps.length ? (
              <Button
                onClick={() => setStep(Math.min(steps.length, step + 1))}
                className="minecraft-btn"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={() => onOpenChange(false)}
                className="minecraft-btn"
              >
                Done
              </Button>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              Having trouble connecting? Visit our 
              <a href="https://discord.gg/szBtDmdkT4" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline ml-1 inline-flex items-center">
                Discord <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinModal;
