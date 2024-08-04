import { useTranslation } from "react-i18next";
import AdminTransactionsChart from "@/pages/admin/dashboard/AdminTransactionsChart";
import AdminVisitorsChart from "@/pages/admin/dashboard/AdminVisitorsChart";
import AdminPlansChart from "@/pages/admin/dashboard/AdminPlansChart";
import AdminForeignCurrencyChart from "@/pages/admin/dashboard/AdminForeignCurrencyChart";
import AdminNewsletterSend from "@/pages/admin/dashboard/AdminNewsLetterSend";

export default function AdminDashboardOverview() {
  const { t } = useTranslation();
  return (
    // <main className="h-full min-h-screen w-full bg-muted/20 px-16 py-5 lg:ml-52 lg:px-5 xl:ml-60">
    <main className="ml-14 min-h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">
        {t("dashboard.overview.welcome")} Admin!
      </h1>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-5">
        <div className="rounded-lg lg:col-span-2 lg:row-span-1">
          <AdminPlansChart />
        </div>

        <div className="flex h-full flex-col gap-4 rounded-lg lg:col-span-1 lg:row-span-1">
          <AdminVisitorsChart />
          <AdminNewsletterSend />
        </div>

        <div className="rounded-lg lg:col-span-3 lg:row-span-1">
          <AdminTransactionsChart />
        </div>

        <div className="rounded-lg lg:col-span-3 lg:row-span-1">
          <AdminForeignCurrencyChart />
        </div>
      </section>
    </main>
  );
}
