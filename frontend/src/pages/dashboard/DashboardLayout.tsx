import Sidebar from "@/components/Sidebar";
import UserPanel from "@/components/UserPanel";
import { UserContextProvider } from "@/contexts/UserContext";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full w-full">
      <UserContextProvider>
        <Sidebar />
        {children}
        <UserPanel />
      </UserContextProvider>
    </section>
  );
}
