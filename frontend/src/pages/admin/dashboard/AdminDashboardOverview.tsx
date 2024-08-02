import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard.tsx";
import AdminTransactionsChart from "@/pages/admin/dashboard/AdminTransactionsChart.tsx";
import AdminVisitorsChart from "@/pages/admin/dashboard/AdminVisitorsChart.tsx";
import AdminUserPlansChart from "@/pages/admin/dashboard/AdminUserPlansChart.tsx";
import AdminForeignCurrencyChart from "@/pages/admin/dashboard/AdminForeignCurrencyChart.tsx";

export default function AdminDashboardOverview() {
  return (
    <main className="h-full w-full bg-muted/20 px-16 py-5 lg:ml-60 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">Bonjour Admin</h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 rounded-lg shadow">
          <AdminUserPlansChart />
        </div>

        <div className="col-span-1 row-span-1 rounded-lg shadow">
          <AdminVisitorsChart />
        </div>

        <div className="col-span-3 row-span-1 rounded-lg shadow">
          <AdminTransactionsChart />
        </div>

        <div className="col-span-3 row-span-1 rounded-lg shadow">
          <AdminForeignCurrencyChart />
        </div>
      </div>
    </main>
  );
}
