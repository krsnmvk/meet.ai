import { auth } from '@/better-auth/auth';
import SignUpView from '@/modules/auth/ui/view/sign-up-view';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) redirect('/');

  return <SignUpView />;
}
