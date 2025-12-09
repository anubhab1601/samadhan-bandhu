import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Applications from './pages/Applications';
import ApplicationDetails from './pages/ApplicationDetails';
import ApplicationReview from './pages/ApplicationReview';
import IncomingApplications from './pages/IncomingApplications';
import Projects from './pages/Projects';
import Districts from './pages/Districts';
import DistrictMap from './pages/DistrictMap';
import Inspections from './pages/Inspections';
import Reports from './pages/Reports';
import FundManagement from './pages/FundManagement';
import HierarchicalFundView from './pages/HierarchicalFundView';
import StateFundTransaction from './pages/StateFundTransaction';
import StatePendingRegistrations from './pages/StatePendingRegistrations';
import BlockRequests from './pages/BlockRequests';
import BlockRequestDetails from './pages/BlockRequestDetails';
import TenderAgencyReview from './pages/TenderAgencyReview';
import BlockFundReleases from './pages/BlockFundReleases';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Applications Routes */}
            <Route path="applications" element={<Applications />} />
            <Route path="applications/all" element={<Applications />} />
            <Route path="applications/pending" element={<Applications />} />
            <Route path="applications/approved" element={<Applications />} />
            <Route path="applications/incoming" element={<IncomingApplications />} />
            <Route path="applications/:id" element={<ApplicationDetails />} />
            <Route path="applications/:id/review" element={<ApplicationReview />} />


            {/* Projects Routes */}
            <Route path="projects" element={<Projects />} />
            <Route path="projects/all" element={<Projects />} />
            <Route path="projects/ongoing" element={<Projects />} />
            <Route path="projects/completed" element={<Projects />} />

            <Route path="projects/:projectId/tender-review" element={<TenderAgencyReview />} />

            {/* Districts Routes */}
            <Route path="districts" element={<Districts />} />
            <Route path="districts/map" element={<DistrictMap />} />

            {/* Fund Management Routes */}
            <Route path="funds" element={<FundManagement />} />
            <Route path="funds/blocks" element={<BlockFundReleases />} />
            <Route path="funds/hierarchical" element={<HierarchicalFundView />} />
            <Route path="funds/transactions" element={<StateFundTransaction />} />

            {/* Inspections Routes */}
            <Route path="inspections" element={<Inspections />} />
            <Route path="inspections/schedule" element={<Inspections />} />
            <Route path="inspections/reports" element={<Inspections />} />

            {/* Reports Routes */}
            <Route path="reports" element={<Reports />} />

            {/* User Management Routes */}
            <Route path="users" element={<StatePendingRegistrations />} />
            <Route path="users/pending" element={<StatePendingRegistrations />} />

            {/* Requests Routes */}
            <Route path="requests" element={<BlockRequests />} />
            <Route path="requests/details" element={<BlockRequestDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
