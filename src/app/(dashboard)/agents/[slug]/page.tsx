import AgentSlugView, {
  AgentSlugViewError,
  AgentSlugViewLoading,
} from '@/modules/agents/ui/view/agent-slug-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: slug }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentSlugViewLoading />}>
        <ErrorBoundary fallback={<AgentSlugViewError />}>
          <AgentSlugView slug={slug} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
