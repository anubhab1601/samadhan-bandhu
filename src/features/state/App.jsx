import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Applications from './pages/Applications';
import Verification from './pages/Verification';
import Projects from './pages/Projects';
import Inspections from './pages/Inspections';
import Reports from './pages/Reports';
import FundManagement from './pages/FundManagement';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/pending" element={<Applications />} />
            <Route path="applications/approved" element={<Applications />} />
            <Route path="verification/assign" element={<Verification />} />
            <Route path="verification/reports" element={<Verification />} />
            <Route path="verification/forward" element={<Verification />} />
            <Route path="projects/ongoing" element={<Projects />} />
            <Route path="projects/completed" element={<Projects />} />
            <Route path="funds" element={<FundManagement />} />
            <Route path="inspections/schedule" element={<Inspections />} />
            <Route path="inspections/reports" element={<Inspections />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
