import { Input } from '@/components/ui/input';
import { useAgentsFiltersClient } from '../../nuqs/use-agents-filters-client';
import { SearchIcon } from 'lucide-react';

export default function AgentsSerachFilter() {
  const [filters, setFilters] = useAgentsFiltersClient();

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Filter by name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="h-9 bg-white pl-7 w-52"
      />
      <SearchIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2" />
    </div>
  );
}
