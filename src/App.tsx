import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AnalysisProvider } from './context/AnalysisContext';
import { MainLayout } from './components/layout/MainLayout';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Analyze } from './pages/Analyze';
import { AnalysisResult } from './pages/AnalysisResult';
import { History } from './pages/History';
import { Reports } from './pages/Reports';
import { Analytics } from './pages/Analytics';
import { About } from './pages/About';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AnalysisProvider>
          <Router>
            <Routes>
              {/* Standalone Landing Page */}
              <Route path="/" element={<Home />} />

              {/* Main Dashboard & Forensic Workspace Routes */}
              <Route
                path="/dashboard"
                element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                }
              />
              <Route
                path="/analyze"
                element={
                  <MainLayout>
                    <Analyze />
                  </MainLayout>
                }
              />
              <Route
                path="/result/:id"
                element={
                  <MainLayout>
                    <AnalysisResult />
                  </MainLayout>
                }
              />
              <Route
                path="/result"
                element={
                  <MainLayout>
                    <AnalysisResult />
                  </MainLayout>
                }
              />
              <Route
                path="/history"
                element={
                  <MainLayout>
                    <History />
                  </MainLayout>
                }
              />
              <Route
                path="/reports"
                element={
                  <MainLayout>
                    <Reports />
                  </MainLayout>
                }
              />
              <Route
                path="/analytics"
                element={
                  <MainLayout>
                    <Analytics />
                  </MainLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <MainLayout>
                    <About />
                  </MainLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                }
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AnalysisProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
