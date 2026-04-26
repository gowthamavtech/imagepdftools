import { create } from 'zustand';

interface HandoffState {
  file: File | null;
  sourceLabel: string | null;
  setHandoff: (file: File, sourceLabel?: string | null) => void;
  consumeHandoff: () => { file: File | null; sourceLabel: string | null };
}

export const useHandoffStore = create<HandoffState>((set, get) => ({
  file: null,
  sourceLabel: null,
  setHandoff: (file, sourceLabel = null) => set({ file, sourceLabel }),
  consumeHandoff: () => {
    const { file, sourceLabel } = get();
    set({ file: null, sourceLabel: null });
    return { file, sourceLabel };
  },
}));
