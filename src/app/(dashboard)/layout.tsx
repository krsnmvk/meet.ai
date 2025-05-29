import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardNavbar from '@/modules/dashboard/components/dashboard-navbar';
import DashboardSidebar from '@/modules/dashboard/components/dashboard-sidebar';
import { Props } from '@/utils/props';

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col bg-muted h-screen w-screen">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
