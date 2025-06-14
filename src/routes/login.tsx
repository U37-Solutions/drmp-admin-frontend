import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button } from 'antd';

import { useAuth } from '@features/auth/AuthProvider';
import LoginForm from '@features/auth/components/LoginForm/LoginForm';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      context.auth.logout();
    }
  },
});

function RouteComponent() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await auth.login('admin', 'password');
      router.navigate({ to: '/about' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
      <Button onClick={handleLogin}>Log in</Button>
    </div>
  );
}
