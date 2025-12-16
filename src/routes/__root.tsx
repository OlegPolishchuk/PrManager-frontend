import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

// export interface AuthContext {
//   user: User;
//   isAuthenticated: boolean;
// }

export interface QueryClientContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<QueryClientContext>()({
  component: () => <Outlet />,
});
