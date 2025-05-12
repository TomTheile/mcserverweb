
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/ImageUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    setImages(savedImages);
  }, []);

  const handleImageUpload = (newImage) => {
    setImages(prev => [...prev, newImage]);
    setShowUploadDialog(false);
  };

  const handleDeleteImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    setImages(updatedImages);
    
    toast({
      title: "Bild gelöscht",
      description: "Das Bild wurde aus der Galerie entfernt",
    });
  };

  const openImagePreview = (image) => {
    setSelectedImage(image);
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="minecraft-header"
          >
            Server Galerie
          </motion.h2>
          
          <Button
            onClick={() => setShowUploadDialog(true)}
            className="minecraft-btn flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Bild hinzufügen
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="minecraft-container group relative overflow-hidden cursor-pointer"
                onClick={() => openImagePreview(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 h-8 w-8" />
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                    className="h-8 w-8 bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-gray-300 text-center">{image.title}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            <p>Noch keine Bilder in der Galerie. Sei der Erste, der ein Bild hinzufügt!</p>
          </motion.div>
        )}
      </div>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bild hochladen</DialogTitle>
          </DialogHeader>
          <ImageUploader onImageUpload={handleImageUpload} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
