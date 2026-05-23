'use client';

import { useEffect, useState, type ComponentType } from 'react';

// useEffect never runs during SSR — this guarantees WordToPdfUI and its
// browser-only dependencies (Worker, queryLocalFonts) are never evaluated
// on the server.
export function WordToPdfUILoader() {
  const [Comp, setComp] = useState<ComponentType | null>(null);

  useEffect(() => {
    import('@/components/WordToPdfUI').then((m) => {
      setComp(() => m.WordToPdfUI);
    });
  }, []);

  if (!Comp) return null;
  return <Comp />;
}
