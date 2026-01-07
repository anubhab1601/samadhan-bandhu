import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import GISMapping from './pages/GISMapping';
import FundAllocation from './pages/FundAllocation';
import FundManagement from './pages/FundManagement';
import Reports from './pages/Reports';
import Payments from './pages/Payments';
import Alerts from './pages/Alerts';
import ProjectDetails from './pages/ProjectDetails';

import Analytics from './pages/Analytics';
import Broadcast from './pages/Broadcast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="broadcast" element={<Broadcast />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<CreateProject />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="funds" element={<FundAllocation />} />
          <Route path="fund-management" element={<FundManagement />} />
          <Route path="gis" element={<GISMapping />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports/monthly" element={<Reports />} />
          <Route path="reports/annual" element={<Reports />} />
          <Route path="reports/custom" element={<Reports />} />
          <Route path="reports" element={<Reports />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
