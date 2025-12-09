import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Tenders from './pages/Tenders';
import Proposals from './pages/Proposals';
import Projects from './pages/Projects';
import Payments from './pages/Payments';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tenders" element={<Tenders />} />
            <Route path="tenders/applied" element={<Tenders />} />
            <Route path="tenders/submit" element={<Tenders />} />
            <Route path="proposals" element={<Proposals />} />
            <Route path="projects/ongoing" element={<Projects />} />
            <Route path="projects/completed" element={<Projects />} />
            <Route path="payments" element={<Payments />} />
            <Route path="payments/pending" element={<Payments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
