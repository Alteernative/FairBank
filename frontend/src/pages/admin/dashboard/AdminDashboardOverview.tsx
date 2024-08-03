import AdminTransactionsChart from "@/pages/admin/dashboard/AdminTransactionsChart.tsx";
import AdminVisitorsChart from "@/pages/admin/dashboard/AdminVisitorsChart.tsx";
import AdminUserPlansChart from "@/pages/admin/dashboard/AdminUserPlansChart.tsx";
import AdminForeignCurrencyChart from "@/pages/admin/dashboard/AdminForeignCurrencyChart.tsx";
import { useTranslation } from "react-i18next";
import AdminNewsLetterSend from "@/pages/admin/dashboard/AdminNewsLetterSend.tsx";

export default function AdminDashboardOverview() {
  const { t } = useTranslation();
  return (
    <main className="h-full min-h-screen w-full bg-muted/20 px-16 py-5 lg:ml-52 lg:px-5 xl:ml-60">
      <h1 className="mb-10 font-jomhuria text-6xl">
        {t("dashboard.overview.welcome")} Admin!
      </h1>
      <section className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 rounded-lg shadow">
          <AdminUserPlansChart />
        </div>

        <div className="col-span-1 row-span-2 rounded-lg shadow">
          <AdminNewsLetterSend />
          <AdminVisitorsChart />
        </div>

        <div className="col-span-3 row-span-1 rounded-lg shadow">
          <AdminTransactionsChart />
        </div>

        <div className="col-span-3 row-span-1 rounded-lg shadow">
          <AdminForeignCurrencyChart />
        </div>
      </section>
    </main>
  );
}
