'use client';

import ErrorState from '@/app/_components/error-state';
import LoadingState from '@/app/_components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '../components/data-table';
import { columns } from '../components/column';
import EmptyState from '@/app/_components/empty-state';
import { useAgentsFiltersClient } from '../../nuqs/use-agents-filters-client';
import DataPagination from '../components/data-pagination';
import { useRouter } from 'next/navigation';

export default function AgentsView() {
  const [filters, setFilters] = useAgentsFiltersClient();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 px-4 md:px-8 gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
    </div>
  );
}

export function AgentsViewLoading() {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a fews seconds"
    />
  );
}

export function AgentsViewError() {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something wen't wrong"
    />
  );
}
