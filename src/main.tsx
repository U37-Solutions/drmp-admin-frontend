import './index.css';
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useAuth } from '@features/auth/AuthProvider'; // Ensure this path is correct

import AppProvider from '@shared/providers/AppProvider';
import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient, auth: undefined, userRole: undefined } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth();
  const userRole = useRoleContext();

  return <RouterProvider router={router} context={{ auth, userRole: userRole ?? undefined }} />;
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
