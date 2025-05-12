
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ImageUploader = ({ onImageUpload }) => {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fehler",
          description: "Das Bild muss kleiner als 5MB sein",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        const newImage = {
          id: Date.now(),
          url: base64String,
          title: file.name.replace(/\.[^/.]+$/, ""),
          uploadDate: new Date().toISOString()
        };
        
        const existingImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        localStorage.setItem('galleryImages', JSON.stringify([...existingImages, newImage]));
        onImageUpload(newImage);
        
        toast({
          title: "Erfolg!",
          description: "Bild wurde erfolgreich hochgeladen",
        });
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-green-500 bg-green-50/10' : 'border-gray-600 hover:border-green-500'}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-green-500">Bild hier ablegen...</p>
        ) : (
          <div>
            <p className="text-gray-300 mb-2">Ziehe ein Bild hierher oder klicke zum Auswählen</p>
            <p className="text-gray-500 text-sm">Maximale Dateigröße: 5MB</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ImageUploader;
