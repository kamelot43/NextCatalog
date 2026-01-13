'use client';

import { Provider } from 'react-redux';
import { useMemo } from 'react';
import { makeStore, type RootState } from './store';

export function Providers({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: RootState;
}) {

  const store = useMemo(() => {
    return makeStore(preloadedState);
  }, [preloadedState]);

  return <Provider store={store}>{children}</Provider>;
}
