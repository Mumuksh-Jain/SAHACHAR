import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemoStore } from './store/useDemoStore';
import { LandingPage } from './pages/LandingPage';
import { FeatureComingSoon } from './pages/FeatureComingSoon';
import { BootSequence } from './components/BootSequence';

function App() {
  const { appView, isBooting } = useDemoStore();

  return (
    <div className="w-full min-h-screen bg-[#070D18] selection:bg-[#E05A1B] selection:text-white">
      {/* Booting Sequence Screen */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            key="boot_sequence"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999]"
          >
            <BootSequence />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Views */}
      <AnimatePresence mode="wait">
        {appView === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <LandingPage />
          </motion.div>
        ) : (
          <motion.div
            key={appView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen"
          >
            <FeatureComingSoon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
