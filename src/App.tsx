import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ForInnovatorsPage from "./pages/ForInnovatorsPage";
import ForCreatorsPage from "./pages/ForCreatorsPage";
import ForInvestorsPage from "./pages/ForInvestorsPage";
import ApplyPage from "./pages/ApplyPage";
import { Footer } from "./components/Footer";
import { PageShell } from "./components/PageShell";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.search]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a1a] text-white dark">
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/innovators" 
            element={
              <PageShell>
                <ForInnovatorsPage />
              </PageShell>
            } 
          />
          <Route 
            path="/creators" 
            element={
              <PageShell>
                <ForCreatorsPage />
              </PageShell>
            } 
          />
          <Route 
            path="/investors" 
            element={
              <PageShell>
                <ForInvestorsPage />
              </PageShell>
            } 
          />
          <Route 
            path="/apply" 
            element={
              <PageShell>
                <ApplyPage />
              </PageShell>
            } 
          />
          <Route
            path="*"
            element={
              <PageShell>
                <div className="container mx-auto px-4 py-24">
                  <h1 className="text-3xl md:text-4xl mb-4">Page not found</h1>
                  <p className="text-white/60">The page you’re looking for doesn’t exist.</p>
                </div>
              </PageShell>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
