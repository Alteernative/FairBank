import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full">
      <AdminSidebar />
      {children}
    </section>
  );
}
