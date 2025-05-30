import Image from 'next/image';

type Props = {
  title?: string;
  description?: string;
};

export default function EmptyState({ description, title }: Props) {
  return (
    <div className="flex items-center flex-col justify-center">
      <Image src="/empty.svg" alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h5 className="text-lg font-medium">{title}</h5>
        <h6 className="text-sm text-muted-foreground">{description}</h6>
      </div>
    </div>
  );
}
