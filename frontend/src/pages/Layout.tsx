import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
