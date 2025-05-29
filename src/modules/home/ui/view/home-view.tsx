'use client';

import { authClient } from '@/better-auth/auth-client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const { data: session } = authClient.useSession();

  const router = useRouter();

  return (
    <div className="p-4">
      <h4>Logged in as: {session?.user.name}</h4>
      <Button
        variant="destructive"
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push('/sign-in'),
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  );
}
