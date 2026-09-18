import { create } from 'zustand';

export type AppView = 'landing' | 'mission_control' | 'driver' | 'citizen' | 'field';

export interface AppStore {
  appView: AppView;
  setAppView: (view: AppView) => void;
  isBooting: boolean;
  setIsBooting: (b: boolean) => void;
  triggerBoot: () => void;
}

export const useDemoStore = create<AppStore>((set) => ({
  appView: 'landing',
  setAppView: (view: AppView) => set({ appView: view }),
  isBooting: true, // Show booting sequence on initial site entry
  setIsBooting: (b: boolean) => set({ isBooting: b }),
  triggerBoot: () => set({ isBooting: true }),
}));
