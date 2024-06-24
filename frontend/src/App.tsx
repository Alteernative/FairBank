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
import DashboardLayout from "./pages/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardExchangeRates from "./pages/DashboardExchangeRates";
import DashboardHelp from "./pages/DashboardHelp";
import DashboardSettings from "./pages/DashboardSettings";
import tmpTransactionTest from "./pages/TmpTransactionTest.tsx";
import TmpTransactionTest from "./pages/TmpTransactionTest.tsx";
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
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardOverview />
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
          path="/TmpTransactionTest"
          element={
            <TmpTransactionTest/>

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
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}
