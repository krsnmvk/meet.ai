import { auth } from '@/better-auth/auth';
import HomeView from '@/modules/home/ui/view/home-view';
import { caller } from '@/trpc/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/sign-in');

  const data = await caller.hello({ text: 'Krisno Server' });

  return (
    <div className="p-4">
      <h2>{data.greeting}</h2>
      <HomeView />
    </div>
  );
}
