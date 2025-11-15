import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Home } from './components/Home';
import { Events } from './components/Events';
import { BestSpots } from './components/BestSpots';
import { MapPage } from './components/MapPage';
import { Contact } from './components/Contact';
import { Auth } from './components/Auth';

export type Page = 'home' | 'events' | 'spots' | 'map' | 'contact' | 'auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'events':
        return <Events onNavigate={setCurrentPage} />;
      case 'spots':
        return <BestSpots onNavigate={setCurrentPage} />;
      case 'map':
        return <MapPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />;
      case 'auth':
        return <Auth onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  // ---- FIX TIPARE + EASING ----
  const easeBezier: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeBezier,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: easeBezier,
      },
    },
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
