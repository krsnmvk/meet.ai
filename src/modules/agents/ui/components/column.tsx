'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AgentGetOne } from '../../types';
import GeneratedAvatar from '@/app/_components/generated-avatar';
import { CornerDownRightIcon, VideoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant="bottsNeutral"
            seed={row.original.name}
            className="size-6"
          />
          <h2 className="font-semibold capitalize">{row.original.name}</h2>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <p className="text-sm truncate text-muted-foreground max-w-52">
            {row.original.intructions}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'meetings',
    header: 'Meetings',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />
        <span>
          {row.original.meetingCount}{' '}
          {row.original.meetingCount === 1 ? 'meeting' : 'meetings'}
        </span>
      </Badge>
    ),
  },
];
