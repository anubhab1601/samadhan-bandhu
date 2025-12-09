import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Applications from './pages/Applications';
import NewApplication from './pages/NewApplication';
import TrackApplication from './pages/TrackApplication';
import Tenders from './pages/Tenders';
import ReleaseTender from './pages/ReleaseTender';
import TenderApplications from './pages/TenderApplications';
import OngoingProjects from './pages/OngoingProjects';
import CompletedProjects from './pages/CompletedProjects';

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
            <Route path="applications/new" element={<NewApplication />} />
            <Route path="applications/track" element={<TrackApplication />} />
            <Route path="tenders" element={<Tenders />} />
            <Route path="tenders/release" element={<ReleaseTender />} />
            <Route path="tenders/applications" element={<TenderApplications />} />
            <Route path="projects/ongoing" element={<OngoingProjects />} />
            <Route path="projects/completed" element={<CompletedProjects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
