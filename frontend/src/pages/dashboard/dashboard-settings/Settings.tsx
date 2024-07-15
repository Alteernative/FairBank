import { UserContextProvider } from "@/contexts/UserContext";
import SettingsSidebar from "@/components/SettingsSidebar";

export default function Settings({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen w-full px-10 py-7">
      <UserContextProvider>
        <SettingsSidebar />
        {children}
      </UserContextProvider>
    </section>
  );
}
