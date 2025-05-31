'use client';

import ResponsiveDialog from '@/app/_components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function useConfirm(title: string, description: string) {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  function confirm() {
    return new Promise((resolve) => setPromise({ resolve }));
  }

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(true);
    handleClose();
  }

  function handleCancel() {
    promise?.resolve(false);
    handleClose();
  }

  function ConfirmationDialog() {
    return (
      <ResponsiveDialog
        isOpen={promise !== null}
        onOpenChange={handleClose}
        title={title}
        description={description}
      >
        <div className="flex flex-col-reverse lg:flex-row w-full gap-y-2 gap-x-2 items-center justify-end pt-4">
          <Button
            type="button"
            onClick={handleCancel}
            variant="destructive"
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="w-full lg:w-auto"
          >
            Confirm
          </Button>
        </div>
      </ResponsiveDialog>
    );
  }

  return {
    ConfirmationDialog,
    confirm,
  };
}
