import type { ReactNode } from 'react';

import { Toaster } from '@/app/components/ui/sonner.tsx';
import { TanstackRouterProvider } from '@/app/providers/router-provider.tsx';
import { TanstackProvider } from '@/app/providers/tanstack-provider.tsx';
import { ThemeProvider } from '@/app/providers/theme-provider.tsx';

export const MainProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Toaster />
        <TanstackRouterProvider />
        {children}
      </ThemeProvider>
    </TanstackProvider>
  );
};
