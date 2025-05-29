import { Props } from '@/utils/props';

export default function Layout({ children }: Props) {
  return (
    <div className="bg-muted flex flex-col items-center justify-center min-h-svh p-6 md:p-10">
      <div className="w-full md:max-w-3xl max-w-sm">{children}</div>
    </div>
  );
}
