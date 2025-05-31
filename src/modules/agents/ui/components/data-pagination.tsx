import { Button } from '@/components/ui/button';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function DataPagination({
  onPageChange,
  page,
  totalPages,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-sm flex-1 text-muted-foreground">
        Page {page} of {totalPages || 1}
      </h4>
      <div className="flex items-center justify-end gap-x-2">
        <Button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          variant="outline"
          size="sm"
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => onPageChange(Math.max(totalPages, page + 1))}
          variant="outline"
          size="sm"
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
