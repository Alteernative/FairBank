import { UserContextProvider } from "@/contexts/UserContext";
import SettingsSidebar from "@/components/SettingsSidebar";
import { Toaster } from "sonner";

export default function Settings({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen w-screen">
      <UserContextProvider>
        <SettingsSidebar />
        {children}
      </UserContextProvider>
      <Toaster richColors />
    </section>
  );
}
