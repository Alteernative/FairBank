import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Personal from "./pages/Personal";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NoPage from "./pages/NoPage";
import FAQPage from "./pages/FAQPage";
import Politiques from "./pages/Politiques";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardTransactions from "./pages/dashboard/transactions/DashboardTransactions";
import DashboardExchangeRates from "./pages/dashboard/DashboardExchangeRates";
import DashboardActivity from "./pages/dashboard/DashboardActivity";
import DashboardHelp from "./pages/dashboard/DashboardHelp";
import Settings from "./pages/dashboard/dashboard-settings/Settings";
import { UserContextProvider } from "@/contexts/UserContext";
import { TransactionContextProvider } from "@/contexts/TransactionContext";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { LanguageProvider } from "./provider/LanguageProvider";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import ProfileSettings from "./pages/dashboard/dashboard-settings/ProfileSettings";
import AccountSettings from "./pages/dashboard/dashboard-settings/AccountSettings";
import AppearanceSettings from "./pages/dashboard/dashboard-settings/AppearanceSettings";
import NotificationsSettings from "./pages/dashboard/dashboard-settings/NotificationsSettings";
import SecuritySettings from "./pages/dashboard/dashboard-settings/SecuritySettings";
import AdminSignIn from "./pages/admin/AdminSignIn";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminDashboardOverview from "./pages/admin/dashboard/AdminDashboardOverview";
import AdminDashboardDemands from "@/pages/admin/dashboard/AdminDashboardDemands";
import Unsubscribe from "@/pages/Unsubscribe";
import AdminProtectedRoute from "@/pages/admin/AdminProtectedRoute";
import ProtectedRoute from "./pages/dashboard/ProtectedRoute";
import "./fonts.css";
import "./utils/i8n.ts";
import { LanguageProvider } from "./provider/LanguageProvider.tsx";
import AdminProtectedRoute from "@/components/AdminProtectedRoute.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";


export default function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <LanguageProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/plans"
              element={
                <Layout>
                  <Personal />
                </Layout>
              }
            />
            <Route
              path="/services"
              element={
                <Layout>
                  <Services />
                </Layout>
              }
            />
            <Route
              path="/about-us"
              element={
                <Layout>
                  <AboutUs />
                </Layout>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/faq"
              element={
                <Layout>
                  <FAQPage />
                </Layout>
              }
            />
            <Route
              path="/politiques"
              element={
                <Layout>
                  <Politiques />
                </Layout>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardOverview />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/transactions"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <TransactionContextProvider>
                      <DashboardTransactions />
                    </TransactionContextProvider>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/activity"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardActivity />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/exchange-rates"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardExchangeRates />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/help"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardHelp />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <UserContextProvider>
                    <Settings>
                      <ProfileSettings />
                    </Settings>
                  </UserContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings/account"
              element={
                <ProtectedRoute>
                  <UserContextProvider>
                    <Settings>
                      <AccountSettings />
                    </Settings>
                  </UserContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings/appearance"
              element={
                <ProtectedRoute>
                  <UserContextProvider>
                    <Settings>
                      <AppearanceSettings />
                    </Settings>
                  </UserContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings/notifications"
              element={
                <ProtectedRoute>
                  <UserContextProvider>
                    <Settings>
                      <NotificationsSettings />
                    </Settings>
                  </UserContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings/security"
              element={
                <ProtectedRoute>
                  <UserContextProvider>
                    <Settings>
                      <SecuritySettings />
                    </Settings>
                  </UserContextProvider>
                </ProtectedRoute>
              }
            />

            <Route
              path="/request/password-reset/"
              element={<PasswordResetRequest />}
            />
            <Route path="/password-reset/:token" element={<PasswordReset />} />

            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard>
                    <AdminDashboardOverview />
                  </AdminDashboard>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/demands"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard>
                    <AdminDashboardDemands />
                  </AdminDashboard>
                </AdminProtectedRoute>
              }
            />
            <Route path="/unsubscribe/:userId" element={<Unsubscribe />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
