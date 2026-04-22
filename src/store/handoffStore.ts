import { create } from 'zustand';

interface HandoffState {
  file: File | null;
  setHandoff: (file: File) => void;
  consumeHandoff: () => File | null;
}

export const useHandoffStore = create<HandoffState>((set, get) => ({
  file: null,
  setHandoff: (file) => set({ file }),
  consumeHandoff: () => {
    const { file } = get();
    set({ file: null });
    return file;
  },
}));
