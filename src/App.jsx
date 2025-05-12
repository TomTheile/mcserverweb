
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';

import HomePage from '@/pages/HomePage.jsx';
import FeaturesPage from '@/pages/FeaturesPage.jsx';
import GalleryPage from '@/pages/GalleryPage.jsx';
import RulesPage from '@/pages/RulesPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-900 minecraft-pattern flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="rules" element={<RulesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
