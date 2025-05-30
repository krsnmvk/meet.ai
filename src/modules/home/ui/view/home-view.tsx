'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

export default function HomeView() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: 'Krisno Mukti' }));

  return (
    <div>
      <h4>Logged in as: {data?.greeting}</h4>
    </div>
  );
}
