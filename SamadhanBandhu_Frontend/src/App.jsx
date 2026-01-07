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
import CentralProjects from './features/central/pages/Projects';
import CentralCreateProject from './features/central/pages/CreateProject';
import CentralProjectDetails from './features/central/pages/ProjectDetails';
import CentralFundAllocation from './features/central/pages/FundAllocation';
import CentralFundTransaction from './features/central/pages/FundTransaction';
import CentralReports from './features/central/pages/Reports';
import CentralGISMapping from './features/central/pages/GISMapping';
import CentralAnalytics from './features/central/pages/Analytics';
import CentralAlerts from './features/central/pages/Alerts';
import CentralProfile from './features/central/pages/Profile';
import CentralSettings from './features/central/pages/Settings';
import CentralApplicationDetails from './features/central/pages/ApplicationDetails';
import CentralBroadcast from './features/central/pages/Broadcast';
import StateDashboard from './features/state/pages/Dashboard';
import StateApplications from './features/state/pages/Applications';
import StateApplicationDetails from './features/state/pages/ApplicationDetails';
import StateVerification from './features/state/pages/Verification';
import StateProjects from './features/state/pages/Projects';
import StateInspections from './features/state/pages/Inspections';
import StateFundManagement from './features/state/pages/FundManagement';
import StateDistricts from './features/state/pages/Districts';
import StateDistrictDetails from './features/state/pages/DistrictDetails';
import StateReports from './features/state/pages/Reports';
import StatePendingRegistrations from './features/state/pages/StatePendingRegistrations';
import StateBlockRequests from './features/state/pages/BlockRequests';
import StateBlockRequestDetails from './features/state/pages/BlockRequestDetails';
import StateTenderAgencyReview from './features/state/pages/TenderAgencyReview';
import StateProfile from './features/state/pages/Profile';
import StateBlockFundReleases from './features/state/pages/BlockFundReleases';
// Block imports (formerly sarpanch)
import BlockDashboard from './features/block/pages/Dashboard';
import BlockProfile from './features/block/pages/Profile';
import BlockNotifications from './features/block/pages/Notifications';
import BlockFundManagement from './features/block/pages/FundTracking';
import BlockRegistration from './features/block/pages/Registration';
import BlockTenders from './features/block/pages/Tenders';
import BlockReleaseTender from './features/block/pages/ReleaseTender';
import BlockTenderApplications from './features/block/pages/TenderApplications';
import BlockOngoingProjects from './features/block/pages/OngoingProjects';
import BlockCompletedProjects from './features/block/pages/CompletedProjects';
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
            <Route path="projects" element={<CentralProjects />} />
            <Route path="projects/new" element={<CentralCreateProject />} />
            <Route path="projects/:id" element={<CentralProjectDetails />} />
            <Route path="funds" element={<CentralFundAllocation />} />
            <Route path="funds/transaction" element={<CentralFundTransaction />} />
            <Route path="reports" element={<CentralReports />} />
            <Route path="gis" element={<CentralGISMapping />} />
            <Route path="analytics" element={<CentralAnalytics />} />
            <Route path="alerts" element={<CentralAlerts />} />
            <Route path="profile" element={<CentralProfile />} />
            <Route path="settings" element={<CentralSettings />} />
            <Route path="broadcast" element={<CentralBroadcast />} />
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

            {/* Verification Routes */}
            <Route path="verification/assign" element={<StateVerification />} />

            {/* Projects Routes */}
            <Route path="projects" element={<StateProjects />} />
            <Route path="projects/ongoing" element={<StateProjects />} />
            <Route path="projects/completed" element={<StateProjects />} />
            <Route path="projects/:projectId/tender-review" element={<StateTenderAgencyReview />} />

            {/* Inspections Routes */}
            <Route path="inspections/schedule" element={<StateInspections />} />
            <Route path="inspections/reports" element={<StateInspections />} />

            {/* Fund Management Routes */}
            <Route path="funds" element={<StateFundManagement />} />
            <Route path="funds/blocks" element={<StateBlockFundReleases />} />

            {/* Districts Routes */}
            <Route path="districts" element={<StateDistricts />} />
            <Route path="districts/:id" element={<StateDistrictDetails />} />

            {/* Reports Routes */}
            <Route path="reports" element={<StateReports />} />

            {/* User Management Routes */}
            <Route path="users/pending" element={<StatePendingRegistrations />} />
            <Route path="users/block" element={<StateBlockRequests />} />
            <Route path="requests" element={<StateBlockRequests />} />
            <Route path="requests/details" element={<StateBlockRequestDetails />} />
            <Route path="profile" element={<StateProfile />} />
          </Route>

          {/* Block routes */}
          <Route
            path="/block/*"
            element={
              <RoleBasedRoute allowedRoles={['block']}>
                <DashboardLayout role="block" />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Navigate to="/block/dashboard" replace />} />
            <Route path="dashboard" element={<BlockDashboard />} />
            <Route path="fund-management" element={<BlockFundManagement />} />
            <Route path="tenders" element={<BlockTenders />} />
            <Route path="release-tender" element={<BlockReleaseTender />} />
            <Route path="tender-applications" element={<BlockTenderApplications />} />
            <Route path="ongoing-projects" element={<BlockOngoingProjects />} />
            <Route path="completed-projects" element={<BlockCompletedProjects />} />
            <Route path="notifications" element={<BlockNotifications />} />
            <Route path="profile" element={<BlockProfile />} />
          </Route>

          {/* Block Registration (Public) */}
          <Route path="/block/register" element={<BlockRegistration />} />

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
