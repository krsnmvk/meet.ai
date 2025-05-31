'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import AgentNewDialog from './agent-new-dialog';
import AgentsSerachFilter from './agents-serach-filter';
import { useAgentsFiltersClient } from '../../nuqs/use-agents-filters-client';
import { DEFAULT_PAGE } from '@/constants';

export default function AgentsListHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useAgentsFiltersClient();

  const isAnyFilterModified = !!filters.search;

  function onClearFilter() {
    setFilters({
      page: DEFAULT_PAGE,
      search: '',
    });
  }

  return (
    <>
      <AgentNewDialog isOpen={isOpen} onOpenChange={setIsOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-xl">My Agents</h4>
          <Button type="button" onClick={() => setIsOpen(true)} size="lg">
            <PlusIcon />
            <span>New Agent</span>
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSerachFilter />
          {isAnyFilterModified && (
            <Button
              type="button"
              onClick={onClearFilter}
              variant="destructive"
              size="sm"
            >
              <XCircleIcon />
              <span>Clear</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
