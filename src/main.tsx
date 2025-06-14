import './index.css';
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import { AuthProvider, useAuth } from '@features/auth/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';

import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient, auth: undefined } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </CookiesProvider>
  );
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
}
