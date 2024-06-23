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
import Dashboard from "./pages/Dashboard";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Layout />}>
//           {/* Add more routes here */}
//           <Route index element={<Home />} />
//         </Route>
//           <Route path='particuliers' element={<Personal />} />
//           <Route path='services' element={<Services />} />
//           <Route path='apropos' element={<About />} />
//           <Route path='connexion' element={<SignUp />} />
//         <Route path='*' element={<NoPage />} />
//       </Routes>
//     </Router>
//   )
// }
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
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>

          } 
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}
