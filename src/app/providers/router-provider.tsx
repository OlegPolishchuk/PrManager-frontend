import { createRouter, RouterProvider } from '@tanstack/react-router';

import { queryClient } from '@/lib/api/query-client.ts';
import { routeTree } from '@/routeTree.gen.ts';

const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const TanstackRouterProvider = () => {
  return <RouterProvider router={router} />;
};
