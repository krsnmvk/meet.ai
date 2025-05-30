import { AlertCircleIcon } from 'lucide-react';

type Props = {
  title?: string;
  description?: string;
};

export default function ErrorState({ description, title }: Props) {
  return (
    <div className="py-4 flex items-center flex-1 px-8 justify-center">
      <div className="flex flex-col items-center justify-center bg-background gap-y-6 rounded-lg p-10 shadow-sm">
        <AlertCircleIcon className="text-red-500 size-6" />
        <div className="flex flex-col gap-y-2 text-center">
          <h5 className="text-lg font-medium">{title}</h5>
          <h6 className="text-sm">{description}</h6>
        </div>
      </div>
    </div>
  );
}
