'use client';

import { Provider } from 'react-redux';
import { useRef } from 'react';
import { makeStore, type AppStore, type RootState } from './store';

export function Providers({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: RootState;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
