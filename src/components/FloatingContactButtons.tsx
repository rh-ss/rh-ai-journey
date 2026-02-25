import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '+919342470019';

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-sm:bottom-4 max-sm:right-4 max-sm:gap-2">
      <motion.a
        href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl hover:shadow-[#25D366]/40 sm:h-14 sm:w-14"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
      </motion.a>

      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40 sm:h-14 sm:w-14"
        aria-label="Call us"
      >
        <Phone size={20} />
      </motion.a>
    </div>
  );
}
