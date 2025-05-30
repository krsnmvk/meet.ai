'use client';

import ErrorState from '@/app/_components/error-state';
import LoadingState from '@/app/_components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export function AgentsViewLoading() {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a fews seconds"
    />
  );
}

export function AgentsViewError() {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something wen't wrong"
    />
  );
}
