'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import DashboardCommand from './dashboard-command';

export default function DashboardNavbar() {
  const { isMobile, state, toggleSidebar } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        setCommandOpen((open) => !open);
      }
    }

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <DashboardCommand isOpen={commandOpen} setIsOpen={setCommandOpen} />
      <nav className="flex items-center bg-background p-4 gap-x-2 border-b">
        <Button
          type="button"
          onClick={toggleSidebar}
          variant="outline"
          className="size-9"
        >
          {state === 'collapsed' || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          type="button"
          onClick={() => setCommandOpen((open) => !open)}
          variant="outline"
          size="sm"
          className="h-9 w-60 text-muted-foreground hover:text-muted-foreground justify-start"
        >
          <SearchIcon className="size-4" />
          <span>Search</span>
          <kbd className="inline-flex items-center ml-auto pointer-events-none select-none font-mono px-1.5 gap-1 bg-muted text-muted-foreground text-[10px] rounded h-5 font-medium">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}
