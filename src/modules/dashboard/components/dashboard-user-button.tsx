import GeneratedAvatar from '@/app/_components/generated-avatar';
import { authClient } from '@/better-auth/auth-client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardUserButton() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending || !data) return null;

  async function onLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/sign-in'),
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white/5 hover:bg-white/10 p-3 rounded-lg flex items-center justify-between w-full border border-border/10 overflow-hidden">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col min-w-0 flex-1 gap-0.5 overflow-hidden text-left">
          <h2 className="text-sm truncate w-full">{data.user.name}</h2>
          <h4 className="text-xs truncate w-full">{data.user.email}</h4>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="center" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <h2 className="font-medium truncate">{data.user.name}</h2>
            <h4 className="text-sm font-normal truncate text-muted-foreground">
              {data.user.email}
            </h4>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          <span>Billing</span>
          <CreditCardIcon />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onLogout()}
          className="cursor-pointer flex items-center justify-between"
        >
          <span>Logout</span>
          <LogOutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
