'use client';

import ErrorState from '@/app/_components/error-state';
import LoadingState from '@/app/_components/loading-state';
import ResponsiveDialog from '@/app/_components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function AgentsView() {
  const [isOpen, setIsOpen] = useState(true);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <ResponsiveDialog
        title="test"
        description="desc test"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <Button>Some Action</Button>
      </ResponsiveDialog>
      {JSON.stringify(data, null, 2)}
    </div>
  );
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
