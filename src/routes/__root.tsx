import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export interface QueryClientContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<QueryClientContext>()({
  component: () => <Outlet />,
});
