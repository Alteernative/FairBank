import { UserContextProvider } from "@/contexts/UserContext";
import SettingsSidebar from "@/components/SettingsSidebar";
import { Toaster } from "sonner";

export default function AdminSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full">
      <UserContextProvider>
        <SettingsSidebar />
        {children}
      </UserContextProvider>
      <Toaster richColors duration={2500} />
    </section>
  );
}
