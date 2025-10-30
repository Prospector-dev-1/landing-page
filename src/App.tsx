import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ForInnovatorsPage from "./pages/ForInnovatorsPage";
import ForCreatorsPage from "./pages/ForCreatorsPage";
import ForInvestorsPage from "./pages/ForInvestorsPage";
import ApplyPage from "./pages/ApplyPage";
import { Footer } from "./components/Footer";
import { PageShell } from "./components/PageShell";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a1a] text-white dark">
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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
