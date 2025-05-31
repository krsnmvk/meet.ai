'use client';

import ErrorState from '@/app/_components/error-state';
import LoadingState from '@/app/_components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import AgentSlugViewHeader from '../components/agent-slug-view-header';
import GeneratedAvatar from '@/app/_components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { VideoIcon } from 'lucide-react';

export default function AgentSlugView({ slug }: { slug: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: slug })
  );

  return (
    <div className="flex flex-col flex-1 p-4 gap-y-4 md:px-8">
      <AgentSlugViewHeader
        agentId={slug}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="bg-white rounded-lg border">
        <div className="flex flex-col px-4 py-5 gap-y-5 col-span-5">
          <div className=" flex items-center gap-x-3">
            <GeneratedAvatar
              seed={data.name}
              variant="bottsNeutral"
              className="size-10"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon className="text-blue-700" />
            <span>
              {data.meetingCount}{' '}
              {data.meetingCount === 1 ? 'meeting' : 'meetings'}
            </span>
          </Badge>
          <div className="flex flex-col gap-y-4">
            <h4 className="text-lg font-medium">Instructions</h4>
            <p className="text-neutral-800">{data.intructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AgentSlugViewLoading() {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a fews seconds"
    />
  );
}

export function AgentSlugViewError() {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something wen't wrong"
    />
  );
}
