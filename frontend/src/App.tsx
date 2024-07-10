import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Personal from "./pages/Personal";
import Services from "./pages/Services";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NoPage from "./pages/NoPage";
import FAQPage from "./pages/FAQPage";
import Politiques from "./pages/Politiques";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardExchangeRates from "./pages/DashboardExchangeRates";
import DashboardHelp from "./pages/DashboardHelp";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardTransactions from "./pages/DashboardTransactions";
import DashboardComparePlans from "./pages/DashboardComparePlans";
import UserProfileSettings from "./pages/UserProfileSettings";
import { UserContextProvider } from "@/contexts/UserContext";
import DashboardGraph from "@/pages/DashboardGraph.tsx";
import PasswordReset from "./components/PasswordReset.tsx";
import PasswordResetRequest from "@/components/PasswordResetRequest.tsx";
export default function App() {
  return (
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
          path="/particuliers"
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
          path="/apropos"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route path="/connexion" element={<SignIn />} />
        <Route path="/inscription" element={<SignUp />} />
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
            <DashboardLayout>
              <DashboardOverview />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/transactions"
          element={
            <DashboardLayout>
              <DashboardTransactions />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/compare-plans"
          element={
            <DashboardLayout>
              <DashboardComparePlans />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/exchange-rates"
          element={
            <DashboardLayout>
              <DashboardExchangeRates />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/help"
          element={
            <DashboardLayout>
              <DashboardHelp />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <DashboardLayout>
              <DashboardSettings />
            </DashboardLayout>
          }
        />

        <Route
          path="/user/settings"
          element={
            <UserContextProvider>
              <UserProfileSettings />
            </UserContextProvider>
          }
        />
        <Route
          path="/user/settings"
          element={
            <UserContextProvider>
              <UserProfileSettings />
            </UserContextProvider>
          }
        />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route
          path="/request/password-reset/"
          element={<PasswordResetRequest />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}
