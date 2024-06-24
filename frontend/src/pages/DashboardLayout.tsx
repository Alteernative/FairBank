import Sidebar from "@/components/Sidebar";
import UserPanel from "@/components/UserPanel";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full mb-5 h-screen">
      <Sidebar />
      {children}
      <UserPanel />
    </section>
  );
}
