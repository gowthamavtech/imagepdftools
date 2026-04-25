import { create } from 'zustand';

export interface HistorySnapshot {
  id: string;
  blob: Blob;
  filename: string;
  toolHref: string;
  toolLabel: string;
}

interface HistoryState {
  entries: HistorySnapshot[];
  push: (entry: Omit<HistorySnapshot, 'id'>) => void;
  undo: () => HistorySnapshot | null;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  entries: [],
  push: (entry) =>
    set((s) => ({
      entries: [{ ...entry, id: crypto.randomUUID() }, ...s.entries].slice(0, 5),
    })),
  undo: () => {
    const { entries } = get();
    if (!entries.length) return null;
    const [first, ...rest] = entries;
    set({ entries: rest });
    return first;
  },
}));
