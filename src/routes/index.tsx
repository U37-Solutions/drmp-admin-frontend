import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      return redirect({ to: '/profile' });
    }

    return redirect({ to: '/login' });
  },
});
