import type { ReactNode } from 'react';

import { MainProvider } from '@/app/providers/main-provider.tsx';

export const App = ({ children }: { children?: ReactNode }) => {
  return <MainProvider>{children}</MainProvider>;
};
