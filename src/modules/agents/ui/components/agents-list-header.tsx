'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import AgentNewDialog from './agent-new-dialog';

export default function AgentsListHeader() {
  const [isOpen, setIsOpen] = useState(false);

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
      </div>
    </>
  );
}
