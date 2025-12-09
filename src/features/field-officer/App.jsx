import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Inspections from './pages/Inspections';
import Reports from './pages/Reports';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inspections" element={<Inspections />} />
            <Route path="inspections/completed" element={<Inspections />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/submit" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
