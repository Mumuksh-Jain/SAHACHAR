import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemoStore } from './store/useDemoStore';
import { MissionControl } from './pages/MissionControl';
import { DriverView, CitizenView, FieldView } from './pages/MobileViews';
import { LandingPage } from './pages/LandingPage';
import { BootSequence } from './components/BootSequence';
import { VirtualCursor } from './components/VirtualCursor';
import { DemoSubtitlesHUD } from './components/DemoSubtitlesHUD';
import { CPSATSolverModal } from './components/CPSATSolverModal';

function App() {
  const { appView, isBooting, demoRecordingMode } = useDemoStore();

  return (
    <div className={`w-full min-h-screen ${demoRecordingMode ? 'overflow-x-hidden selection:bg-[#E05A1B]' : ''}`}>
      {/* Scripted Autonomous Demo Overlays */}
      <VirtualCursor />
      <DemoSubtitlesHUD />
      <CPSATSolverModal />
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

      <AnimatePresence mode="wait">
        {appView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <LandingPage />
          </motion.div>
        )}
        {appView === 'mission_control' && (
          <motion.div
            key="mission_control"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: '100vh', width: '100vw' }}
          >
            <MissionControl />
          </motion.div>
        )}
      {appView === 'driver' && (
        <motion.div
          key="driver"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          style={{ height: '100vh', width: '100vw' }}
        >
          <DriverView />
        </motion.div>
      )}
      {appView === 'citizen' && (
        <motion.div
          key="citizen"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          style={{ height: '100vh', width: '100vw' }}
        >
          <CitizenView />
        </motion.div>
      )}
        {appView === 'field' && (
          <motion.div
            key="field"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            style={{ height: '100vh', width: '100vw' }}
          >
            <FieldView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
