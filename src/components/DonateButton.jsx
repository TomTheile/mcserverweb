
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DonateButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <form action="https://www.paypal.com/donate" method="post" target="_blank">
        <input type="hidden" name="business" value="TurboKid@outlook.de" />
        <input type="hidden" name="currency_code" value="EUR" />
        <Button 
          type="submit"
          className="bg-[#009cde] hover:bg-[#008ac8] text-white flex items-center gap-2 px-6 py-3 rounded-md"
        >
          <Heart className="h-5 w-5" />
          Spenden
        </Button>
      </form>
    </motion.div>
  );
};

export default DonateButton;
