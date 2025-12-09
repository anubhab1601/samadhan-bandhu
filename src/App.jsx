import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import RoleBasedRoute from './routes/RoleBasedRoute';
import DashboardLayout from './shared/layouts/DashboardLayout';

// Import dashboards
import CentralDashboard from './features/central/pages/Dashboard';
import CentralIncomingApplications from './features/central/pages/IncomingApplications';
import CentralApplicationDetails from './features/central/pages/ApplicationDetails';
import StateDashboard from './features/state/pages/Dashboard';
import StateApplications from './features/state/pages/Applications';
import StateApplicationDetails from './features/state/pages/ApplicationDetails';
import SarpanchDashboard from './features/sarpanch/pages/Dashboard';
import SarpanchApplications from './features/sarpanch/pages/Applications';
import SarpanchNewApplication from './features/sarpanch/pages/NewApplication';
import SarpanchApplicationDetails from './features/sarpanch/pages/ApplicationDetails';
import SarpanchTrackApplication from './features/sarpanch/pages/TrackApplication';
import SarpanchProfile from './features/sarpanch/pages/Profile';
import SarpanchNotifications from './features/sarpanch/pages/Notifications';
import SarpanchFundTracking from './features/sarpanch/pages/FundTracking';
import SarpanchRegistration from './features/sarpanch/pages/Registration';
import SarpanchTenders from './features/sarpanch/pages/Tenders';
import SarpanchReleaseTender from './features/sarpanch/pages/ReleaseTender';
import SarpanchTenderApplications from './features/sarpanch/pages/TenderApplications';
import SarpanchOngoingProjects from './features/sarpanch/pages/OngoingProjects';
import SarpanchCompletedProjects from './features/sarpanch/pages/CompletedProjects';
import FieldOfficerDashboard from './features/field-officer/pages/Dashboard';
import FieldOfficerInspections from './features/field-officer/pages/Inspections';
import FieldOfficerInspectionDetails from './features/field-officer/pages/InspectionDetails';
import FieldOfficerInspectionForm from './features/field-officer/pages/InspectionForm';
import FieldOfficerReports from './features/field-officer/pages/Reports';
import FieldOfficerSchedule from './features/field-officer/pages/Schedule';
import FieldOfficerInspectionHistory from './features/field-officer/pages/InspectionHistory';
import FieldOfficerHistoryDetail from './features/field-officer/pages/HistoryDetail';
import FieldOfficerNotifications from './features/field-officer/pages/Notifications';
import FieldOfficerTasks from './features/field-officer/pages/Tasks';
import FieldOfficerProfile from './features/field-officer/pages/Profile';
import AgencyDashboard from './features/agency/pages/Dashboard';
import AgencyRegistration from './features/agency/pages/Registration';
import TenderApplications from './features/agency/pages/TenderApplications';
import TenderDetails from './features/agency/pages/TenderDetails';
import TenderApply from './features/agency/pages/TenderApply';
import ProjectExecution from './features/agency/pages/ProjectExecution';
import ProgressReportSubmission from './features/agency/pages/ProgressReportSubmission';
import AgencyTasks from './features/agency/pages/Tasks';
import AgencyNotifications from './features/agency/pages/Notifications';
import AgencyPayments from './features/agency/pages/Payments';
import AgencyWorkers from './features/agency/pages/Workers';
import AgencySchedule from './features/agency/pages/Schedule';
import AgencyProfile from './features/agency/pages/Profile';
import IVAOfficerDashboard from './features/iva-officer/pages/Dashboard';
import IVAAssignments from './features/iva-officer/pages/Assignments';
import IVAReports from './features/iva-officer/pages/Reports';
import IVAVerifications from './features/iva-officer/pages/Verifications';
import IVAVillageVerificationDetail from './features/iva-officer/pages/VillageVerificationDetail';
import IVACommitteeVerificationDetail from './features/iva-officer/pages/CommitteeVerificationDetail';
import IVAAgencyVerificationDetail from './features/iva-officer/pages/AgencyVerificationDetail';
import IVAVerificationHistory from './features/iva-officer/pages/VerificationHistory';
import IVAHistoryDetailView from './features/iva-officer/pages/HistoryDetailView';
import IVANotifications from './features/iva-officer/pages/Notifications';
import IVASchedule from './features/iva-officer/pages/Schedule';
import IVATasks from './features/iva-officer/pages/Tasks';
import IVARegistration from './features/iva-officer/pages/Registration';
import IVAProfile from './features/iva-officer/pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/agency-registration" element={<AgencyRegistration />} />

          {/* Central routes */}
          <Route
            path="/central/*"
            element={
              <RoleBasedRoute allowedRoles={['central']}>
                <DashboardLayout role="central" />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Navigate to="/central/dashboard" replace />} />
            <Route path="dashboard" element={<CentralDashboard />} />
            <Route path="applications" element={<CentralIncomingApplications />} />
            <Route path="applications/:id" element={<CentralApplicationDetails />} />
          </Route>

          {/* State routes */}
          <Route
            path="/state/*"
            element={
              <RoleBasedRoute allowedRoles={['state']}>
                <DashboardLayout role="state" />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Navigate to="/state/dashboard" replace />} />
            <Route path="dashboard" element={<StateDashboard />} />
            <Route path="applications" element={<StateApplications />} />
            <Route path="applications/:id" element={<StateApplicationDetails />} />
          </Route>

          {/* Sarpanch routes */}
          <Route
            path="/sarpanch/*"
            element={
              <RoleBasedRoute allowedRoles={['sarpanch']}>
                <DashboardLayout role="sarpanch" />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Navigate to="/sarpanch/dashboard" replace />} />
            <Route path="dashboard" element={<SarpanchDashboard />} />
            <Route path="new-application" element={<SarpanchNewApplication />} />
            <Route path="applications" element={<SarpanchApplications />} />
            <Route path="applications/:id" element={<SarpanchApplicationDetails />} />
            <Route path="track-application" element={<SarpanchTrackApplication />} />
            <Route path="track-application/:id" element={<SarpanchTrackApplication />} />
            <Route path="tenders" element={<SarpanchTenders />} />
            <Route path="release-tender" element={<SarpanchReleaseTender />} />
            <Route path="tender-applications" element={<SarpanchTenderApplications />} />
            <Route path="ongoing-projects" element={<SarpanchOngoingProjects />} />
            <Route path="completed-projects" element={<SarpanchCompletedProjects />} />
            <Route path="notifications" element={<SarpanchNotifications />} />
            <Route path="fund-tracking" element={<SarpanchFundTracking />} />
            <Route path="profile" element={<SarpanchProfile />} />
          </Route>

          {/* Sarpanch Registration (Public) */}
          <Route path="/sarpanch/register" element={<SarpanchRegistration />} />

          {/* Field Officer routes */}
          <Route
            path="/field-officer/*"
            element={
              <RoleBasedRoute allowedRoles={['field-officer']}>
                <DashboardLayout role="field-officer" />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Navigate to="/field-officer/dashboard" replace />} />
            <Route path="dashboard" element={<FieldOfficerDashboard />} />
            <Route path="inspections" element={<FieldOfficerInspections />} />
            <Route path="inspections/:inspectionId" element={<FieldOfficerInspectionDetails />} />
            <Route path="inspections/:inspectionId/form" element={<FieldOfficerInspectionForm />} />
            <Route path="inspections/:inspectionId/report" element={<FieldOfficerReports />} />
            <Route path="reports" element={<FieldOfficerReports />} />
            <Route path="schedule" element={<FieldOfficerSchedule />} />
            <Route path="history" element={<FieldOfficerInspectionHistory />} />
            <Route path="history/:inspectionId" element={<FieldOfficerHistoryDetail />} />
            <Route path="notifications" element={<FieldOfficerNotifications />} />
            <Route path="tasks" element={<FieldOfficerTasks />} />
            <Route path="profile" element={<FieldOfficerProfile />} />
          </Route>

          {/* Agency routes */}
          <Route
            path="/agency/*"
            element={
              <RoleBasedRoute allowedRoles={['agency']}>
                <DashboardLayout role="agency" />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Navigate to="/agency/dashboard" replace />} />
            <Route path="dashboard" element={<AgencyDashboard />} />
            <Route path="tenders" element={<TenderApplications />} />
            <Route path="tenders/:tenderId" element={<TenderDetails />} />
            <Route path="tenders/:tenderId/apply" element={<TenderApply />} />
            <Route path="projects" element={<ProjectExecution />} />
            <Route path="projects/:projectId" element={<ProjectExecution />} />
            <Route path="projects/:projectId/progress-report" element={<ProgressReportSubmission />} />
            <Route path="projects/ongoing" element={<ProjectExecution />} />
            <Route path="projects/completed" element={<ProjectExecution />} />
            <Route path="tasks" element={<AgencyTasks />} />
            <Route path="notifications" element={<AgencyNotifications />} />
            <Route path="payments" element={<AgencyPayments />} />
            <Route path="workers" element={<AgencyWorkers />} />
            <Route path="schedule" element={<AgencySchedule />} />
            <Route path="profile" element={<AgencyProfile />} />
          </Route>

          {/* IVA Officer routes */}
          <Route
            path="/iva-officer/*"
            element={
              <RoleBasedRoute allowedRoles={['iva-officer']}>
                <DashboardLayout role="iva-officer" />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Navigate to="/iva-officer/dashboard" replace />} />
            <Route path="dashboard" element={<IVAOfficerDashboard />} />
            <Route path="assignments" element={<IVAAssignments />} />
            <Route path="reports" element={<IVAReports />} />
            <Route path="verifications" element={<IVAVerifications />} />
            <Route path="verifications/village/:id" element={<IVAVillageVerificationDetail />} />
            <Route path="verifications/committee/:id" element={<IVACommitteeVerificationDetail />} />
            <Route path="verifications/agency/:id" element={<IVAAgencyVerificationDetail />} />
            <Route path="history" element={<IVAVerificationHistory />} />
            <Route path="history/village/:id" element={<IVAHistoryDetailView />} />
            <Route path="history/committee/:id" element={<IVAHistoryDetailView />} />
            <Route path="history/agency/:id" element={<IVAHistoryDetailView />} />
            <Route path="notifications" element={<IVANotifications />} />
            <Route path="schedule" element={<IVASchedule />} />
            <Route path="tasks" element={<IVATasks />} />
            <Route path="profile" element={<IVAProfile />} />
          </Route>

          {/* IVA Officer Registration (Public) */}
          <Route path="/iva-officer/register" element={<IVARegistration />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <p className="text-xl text-gray-600 mt-4">Page not found</p>
                <a href="/login" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Go to Login
                </a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
