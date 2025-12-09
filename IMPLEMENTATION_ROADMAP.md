# PM-AJAY Unified Portal - Complete Implementation Roadmap

## 📋 Overview

This document outlines the complete implementation plan for the PM-AJAY (Adarsh Gram) Unified Portal based on the global system prompt requirements. The portal consolidates 6 role-based portals with self-registration, role-based approval workflows, and comprehensive project management features.

---

## ✅ Current Status (What's Already Built)

### Infrastructure ✓
- ✅ Unified React + Vite application
- ✅ Tailwind CSS configured
- ✅ Role-based routing structure
- ✅ Authentication context with JWT
- ✅ Two-factor authentication (credentials + face auth)
- ✅ Route guards for role-based access control
- ✅ Shared components (Navbar, Sidebar, StatCard, DashboardLayout)

### Authentication ✓
- ✅ Unified login page with role selection
- ✅ Credential verification (email/password)
- ✅ Face authentication (2FA)
- ✅ Role-based redirection after login
- ✅ Protected routes

### Portal Structure ✓
- ✅ Central portal folder structure
- ✅ State portal folder structure
- ✅ Sarpanch portal folder structure
- ✅ Agency portal folder structure
- ✅ Field Officer portal structure
- ✅ IVA Officer portal structure

### Existing Pages ✓
- ✅ Login page with 2FA
- ✅ Agency registration page
- ✅ Placeholder dashboards for all 6 roles
- ✅ Some application pages (partially implemented)

---

## 🚧 What Needs to Be Implemented

## Phase 1: Global Registration System 🔴 HIGH PRIORITY

### 1.1 Create Global Registration Page
**Location**: `src/features/auth/components/Register.jsx`

**Requirements**:
- [ ] Multi-step registration form
- [ ] Role selection (Sarpanch, Agency, Field Officer, State Officer, IVA Officer, Center Officer)
- [ ] Common fields:
  - Full name
  - Official email ID
  - Mobile number
  - Role (dropdown)
  - Department/Organization name
  - State, District
  - Password + Confirm password
- [ ] Role-specific additional fields (dynamic based on role selection)
- [ ] Document upload capability
- [ ] Face data capture and storage (role-specific)
- [ ] Form validation
- [ ] Submit to backend with status = "Pending Approval"

### 1.2 Role-Specific Registration Fields

**Sarpanch**:
- [ ] Village name, Gram Panchayat, Block, District, State, PIN
- [ ] Official Sarpanch ID/letter number
- [ ] Period of tenure (from–to)

**Agency**:
- [ ] Agency name
- [ ] Registration number & authority
- [ ] Year of establishment
- [ ] Types of work (roads, buildings, etc.)
- [ ] Bank details (Account number, IFSC, bank, branch)
- [ ] Document uploads (Registration cert, PAN, GST, licensing)

**Field Officer**:
- [ ] Designation
- [ ] Department (e.g., Rural Development)
- [ ] Office address
- [ ] Official employee ID

**State Officer**:
- [ ] Designation
- [ ] Department
- [ ] Office address

**IVA Officer**:
- [ ] Organization/Agency name
- [ ] Designation
- [ ] Office address
- [ ] Official ID proof / empanelment document upload

**Center Officer**:
- [ ] Designation (e.g., Director, Joint Secretary)
- [ ] Ministry/Department
- [ ] Official office address

### 1.3 Registration Approval Workflow
**Location**: Create approval pages in each portal

- [ ] **Center Portal**: Approve State Officers, IVA Officers, Center Officers
- [ ] **State Portal**: Approve Sarpanch, Agencies, Field Officers
- [ ] Create "Pending Registrations" page for each approver role
- [ ] Approve/Reject functionality with remarks
- [ ] Email notifications on approval/rejection
- [ ] Status updates visible to registrant

---

## Phase 2: Center Portal (PM-AJAY Central Officer) 🟡 MEDIUM PRIORITY

### 2.1 Center Dashboard Enhancement
**Location**: `src/features/central/pages/Dashboard.jsx`

- [ ] Total projects card
- [ ] Ongoing projects card
- [ ] Completed projects card
- [ ] Pending consent notes card
- [ ] Pending fund releases card
- [ ] Filters: State, District, Financial year, Status
- [ ] Quick tables: "Pending Consent Note", "Pending Fund Release"
- [ ] Charts/graphs for visual analytics

### 2.2 Project Inbox / Applications
**Location**: `src/features/central/pages/IncomingApplications.jsx`

- [ ] Table of all applications forwarded by States
- [ ] Columns: Application ID, Project ID, Village, State, Requested Amount, Status, Last Updated
- [ ] Filters: state, status, year
- [ ] Search functionality
- [ ] Pagination
- [ ] Click row → Navigate to Project Detail View

### 2.3 Project Detail View
**Location**: `src/features/central/pages/ApplicationDetails.jsx`

- [ ] Display Sarpanch's original application form
- [ ] Display uploaded photos
- [ ] IVA eligibility verification report
- [ ] State officer remarks and recommendation
- [ ] Tender details & selected agency
- [ ] Inspection summary
- [ ] Full timeline of actions (Flipkart-style tracking)
- [ ] Action buttons: Approve/Reject

### 2.4 Consent Note Management
**Location**: `src/features/central/pages/ConsentNoteManagement.jsx`

- [ ] Issue Consent Note page
- [ ] Approve project form:
  - Approved amount input
  - Conditions text area
  - Tentative installment structure
  - Expected project duration (months)
  - High-level milestones
  - Generate/upload Consent Note PDF
- [ ] Reject project form:
  - Mandatory "Reason for Rejection" text
- [ ] Status sync to State & Sarpanch portals
- [ ] Consent note download functionality

### 2.5 Fund Release Management
**Location**: `src/features/central/pages/FundReleases.jsx`

- [ ] List: Project ID, State, Approved amount, Released so far, Next eligible installment
- [ ] "Release Installment to State" action:
  - Installment number (1st, 2nd, 3rd, etc.)
  - Amount input
  - Date of release
  - Transaction reference / UTR
  - Validation: Cannot reuse installment number
- [ ] Installment history table
- [ ] Status update triggers to all portals

### 2.6 Monitoring & Reports
**Location**: `src/features/central/pages/Reports.jsx`

- [ ] Funds released per state report
- [ ] Project completion % by state
- [ ] Quality rating distribution from inspections
- [ ] Export to Excel/PDF functionality
- [ ] Drilldown to project-level details
- [ ] Interactive charts and graphs

### 2.7 User & Role Management
**Location**: `src/features/central/pages/UserManagement.jsx`

- [ ] Approve/reject registrations for State Officers, IVA Officers, Center Officers
- [ ] View list of all users and roles
- [ ] Activate/deactivate accounts
- [ ] User search and filters
- [ ] User detail view

---

## Phase 3: State Portal 🟡 MEDIUM PRIORITY

### 3.1 State Dashboard Enhancement
**Location**: `src/features/state/pages/Dashboard.jsx`

- [ ] New village applications card
- [ ] Applications under IVA verification card
- [ ] Projects forwarded to Center card
- [ ] Projects under execution card
- [ ] Completed projects card
- [ ] "Installments ready for release" highlight
- [ ] "Inspections scheduled this week" highlight

### 3.2 Village Applications Inbox
**Location**: `src/features/state/pages/Applications.jsx`

- [ ] List of Sarpanch-submitted applications
- [ ] Columns: Application ID, Village, District, Sarpanch, Status, Submitted on
- [ ] Filters: District, Status, Scheme year
- [ ] Search functionality
- [ ] Click application → detail view

### 3.3 Application Detail & Forward to IVA
**Location**: `src/features/state/pages/ApplicationDetails.jsx`

- [ ] View full Sarpanch form
- [ ] View uploaded photos
- [ ] "Forward to IVA Agency" action:
  - Select IVA Officer/Agency (dropdown)
  - Internal remarks
  - Deadline for verification
- [ ] "Reject Application" action:
  - Mandatory reason
- [ ] Status update to Sarpanch, IVA, State

### 3.4 Post-Verification Review
**Location**: `src/features/state/pages/IVAReview.jsx`

- [ ] List of applications returned by IVA
- [ ] Show IVA checklist result
- [ ] Show eligibility decision
- [ ] Show IVA remarks
- [ ] If Eligible: Forward to Center with State recommendation
- [ ] If Not eligible: Close application with comments

### 3.5 Project Workflow Tracker
**Location**: `src/features/state/pages/ProjectTracker.jsx`

- [ ] Project-wise page showing all stages
- [ ] Timeline: Sarpanch → IVA → State → Center → Tender → Inspections → Completion
- [ ] Visual progress indicator
- [ ] Status badges

### 3.6 Tender & Agency Confirmation Review
**Location**: `src/features/state/pages/TenderReview.jsx`

- [ ] View selected agency full profile
- [ ] Agency registration ID, bank details
- [ ] Uploaded PDFs: proposal, budget breakdown, committee resolution
- [ ] Forward to IVA for committee & agency verification
- [ ] After IVA confirms: Forward to Center

### 3.7 Fund Management (State → Agency)
**Location**: `src/features/state/pages/FundManagement.jsx`

- [ ] List of projects with fund details
- [ ] Total central fund received
- [ ] Installments already released to agency
- [ ] Balance calculation
- [ ] "Release Installment to Agency" action:
  - Installment number
  - Amount
  - Date & transaction reference
  - Validation: Cannot reuse installment number

### 3.8 Inspection Scheduling & Field Officer Assignment
**Location**: `src/features/state/pages/InspectionScheduling.jsx`

- [ ] Schedule Inspection page
- [ ] For each project and installment stage:
  - Select Field Officer (dropdown)
  - Choose inspection date
  - Add notes
- [ ] Change inspection date functionality
- [ ] Reassign officer functionality
- [ ] Status update to Field Officer

### 3.9 Inspection Review
**Location**: `src/features/state/pages/InspectionReview.jsx`

- [ ] View Field Officer reports
- [ ] Geo-tagged photo sets display
- [ ] Rating (1–5) display
- [ ] % completion display
- [ ] Receipts view
- [ ] Remarks & public feedback
- [ ] Actions:
  - Approve inspection and allow next installment
  - Raise queries
  - Request re-inspection

### 3.10 State Reports & Analytics
**Location**: `src/features/state/pages/StateReports.jsx`

- [ ] Fund disbursal report (project/district-wise)
- [ ] Progress and delays report
- [ ] Export options (Excel/PDF)
- [ ] Charts and graphs

### 3.11 State User Management
**Location**: `src/features/state/pages/StateUserManagement.jsx`

- [ ] Approve/reject registrations for Sarpanch, Agencies, Field Officers, IVA officers
- [ ] Map users to districts/regions
- [ ] User list with filters
- [ ] Activate/deactivate accounts

---

## Phase 4: Sarpanch Portal 🟢 PARTIALLY COMPLETE

### 4.1 Sarpanch Dashboard Enhancement
**Location**: `src/features/sarpanch/pages/Dashboard.jsx`

- [ ] New Application card
- [ ] Applications in Progress card
- [ ] Approved Projects card
- [ ] Rejected Applications card
- [ ] Timeline of project statuses (Flipkart-style tracking)

### 4.2 New Application Form (PM-AJAY Adarsh Gram)
**Location**: `src/features/sarpanch/pages/NewApplication.jsx`

**Village Details Section**:
- [ ] Village name, GP, Block, District, State, PIN
- [ ] Population (total)
- [ ] SC/ST population
- [ ] BPL households
- [ ] Primary livelihoods
- [ ] Major caste groups

**Current Infrastructure Section**:
- [ ] Roads (Yes/No + condition)
- [ ] School (Yes/No + details)
- [ ] Health center (Yes/No + details)
- [ ] Drinking water (Yes/No + source)
- [ ] Sanitation (Yes/No + coverage %)
- [ ] Electricity (Yes/No + hours)
- [ ] Community hall (Yes/No + condition)

**Project Proposal Section**:
- [ ] Type of work (dropdown + text)
- [ ] Justification (textarea)
- [ ] Expected benefits (textarea)
- [ ] Estimated cost (number input)

**Photo Upload Section**:
- [ ] 4–5 geo-tagged photo uploads
- [ ] Current site condition photos
- [ ] Surroundings photos
- [ ] Geo-location capture
- [ ] Photo preview

**Declaration**:
- [ ] Declaration checkbox
- [ ] Submit button
- [ ] Create Application ID on submit
- [ ] Status: "Submitted to State"

### 4.3 My Applications / Projects
**Location**: `src/features/sarpanch/pages/Applications.jsx`

- [ ] List: Application ID, Project Name, Scheme, Status, Last update
- [ ] Click → full detail + timeline
- [ ] Filter by status
- [ ] Search functionality

### 4.4 Application Detail View
**Location**: `src/features/sarpanch/pages/ApplicationDetails.jsx`

- [ ] Show original form
- [ ] Show uploaded photos
- [ ] State/IVA decisions
- [ ] Center consent note (if issued)
- [ ] Rejection reasons if any
- [ ] Download consent note
- [ ] Timeline tracker

### 4.5 Tender Management
**Location**: `src/features/sarpanch/pages/ReleaseTender.jsx`

**Create Tender**:
- [ ] Choose approved project (dropdown)
- [ ] Eligibility criteria (experience, category, registration)
- [ ] Detailed scope of work (rich text editor)
- [ ] Timeline: start & end dates for tender
- [ ] Option to close tender earlier
- [ ] Upload extra documents
- [ ] Set status: "Tender Open"

### 4.6 Tender Applications & Committee Selection
**Location**: `src/features/sarpanch/pages/TenderApplications.jsx`

- [ ] View list of agency applications
- [ ] Agency name, ID, proposal summary, budget PDF, detailed proposal PDF
- [ ] After deadline: Create Committee section
  - Sarpanch + 5 members
  - Names, roles, contact, ID proof upload
- [ ] "Finalize Agency" section:
  - Select winning agency (radio buttons)
  - Enter decision notes
  - Upload signed committee resolution PDF

### 4.7 Submission to State
**Location**: `src/features/sarpanch/pages/SubmitToState.jsx`

- [ ] Final form with:
  - Selected agency details
  - Committee details
  - Signed PDFs
- [ ] Submit button
- [ ] Status: Sent to State for review & verification

### 4.8 Project Status & Fund Tracking
**Location**: `src/features/sarpanch/pages/ProjectStatus.jsx`

- [ ] For each project:
  - Project status timeline
  - Installments released from State to Agency
  - Upcoming inspections
  - Assigned Field Officer info
- [ ] Visual timeline
- [ ] Fund flow diagram

### 4.9 Notifications / Communication
**Location**: `src/features/sarpanch/pages/Notifications.jsx`

- [ ] Notifications list:
  - Application status changes
  - IVA decisions
  - Center consent
  - Tender applications
  - Inspection reports
  - Installments
- [ ] Mark as read functionality
- [ ] Optional messaging to State/Agency
- [ ] Email notification integration

---

## Phase 5: Agency Portal 🟢 PARTIALLY COMPLETE

### 5.1 Agency Dashboard Enhancement
**Location**: `src/features/agency/pages/Dashboard.jsx`

- [ ] Open Tenders card
- [ ] Tenders Applied card
- [ ] Projects Awarded card
- [ ] Ongoing Projects card
- [ ] Completed Projects card
- [ ] Alerts: Inspection dates, Funds received

### 5.2 Tender Listing
**Location**: `src/features/agency/pages/Tenders.jsx`

- [ ] Show tenders where agency meets eligibility OR show all with badge
- [ ] Columns: Tender ID, Project Name, Village, Deadline, Approximate project cost
- [ ] Filters: district, type of work
- [ ] Eligibility badge (Eligible/Not Eligible)
- [ ] Search functionality

### 5.3 Tender Detail + Apply
**Location**: `src/features/agency/pages/TenderDetail.jsx`

**Detail Section**:
- [ ] Scope of work
- [ ] Eligibility criteria
- [ ] Timeline
- [ ] Required documents

**Apply Form**:
- [ ] Proposed cost input
- [ ] Timeline & methodology summary (textarea)
- [ ] Upload budget breakdown PDF
- [ ] Upload detailed proposal PDF
- [ ] Submit button
- [ ] Status: Applied; visible to Sarpanch

### 5.4 My Tender Applications
**Location**: `src/features/agency/pages/Proposals.jsx`

- [ ] List: Tender ID, Project, Status (Submitted/Under review/Selected/Not selected)
- [ ] Decision remarks if available
- [ ] Filter by status
- [ ] Search functionality

### 5.5 Awarded Projects & Fund Tracking
**Location**: `src/features/agency/pages/AwardedProjects.jsx`

**Projects List**:
- [ ] Project ID, Village, Sarpanch, total sanctioned amount

**Project Details**:
- [ ] Installment history table:
  - Installment #, amount, date received, transaction reference
- [ ] Inspection schedule:
  - Dates & field officer contact
- [ ] Upload section for receipts/invoices

### 5.6 Agency Profile
**Location**: `src/features/agency/pages/Profile.jsx`

- [ ] View profile details
- [ ] Update limited fields (contact, phone, email)
- [ ] Edit critical fields (registration, bank) triggers re-verification
- [ ] Document management
- [ ] Re-verification status

---

## Phase 6: Field Officer Portal 🟡 MEDIUM PRIORITY

### 6.1 Field Officer Dashboard Enhancement
**Location**: `src/features/field-officer/pages/Dashboard.jsx`

- [ ] Inspections today card
- [ ] Inspections this week card
- [ ] Overdue inspections card
- [ ] Completed inspections card
- [ ] Map view of upcoming inspections
- [ ] Calendar view

### 6.2 Assigned Inspections List
**Location**: `src/features/field-officer/pages/Inspections.jsx`

- [ ] For each assigned inspection:
  - Project ID, Village, Agency, Sarpanch
  - Inspection number (1st/2nd/etc.)
  - Scheduled date
  - Status
- [ ] Filters: date range, status
- [ ] Search functionality

### 6.3 Inspection Detail & Form
**Location**: `src/features/field-officer/pages/InspectionForm.jsx`

**Basic Info Section** (auto-filled):
- [ ] Project details
- [ ] Agency details
- [ ] Scheduled date

**Photo Upload Section** (geo-tag mandatory):
- [ ] 1st set: Construction site (2–3 photos)
- [ ] 2nd set: Waste material area
- [ ] 3rd set: Officer + agency head
- [ ] 4th set: Receipts of materials used
- [ ] Geo-location capture for each photo
- [ ] Photo preview

**Work Assessment Section**:
- [ ] Agency name (auto-filled)
- [ ] Agency head name (input)
- [ ] Upload ID proof photo of agency head
- [ ] Quality rating 1–5 (dropdown/stars)
- [ ] % completion (0–100 slider)
- [ ] Remarks & improvement suggestions (textarea)
- [ ] Optional local public feedback text (textarea)

**Actions**:
- [ ] Save Draft button
- [ ] Submit to State button
- [ ] Form validation

### 6.4 Inspection History
**Location**: `src/features/field-officer/pages/Reports.jsx`

- [ ] View all inspections completed by officer
- [ ] Project, date, rating, % completion
- [ ] Detailed view: submitted form + photos
- [ ] Export functionality
- [ ] Filter by date, project, rating

### 6.5 Notifications
**Location**: `src/features/field-officer/pages/Notifications.jsx`

- [ ] New inspection assignments
- [ ] Date changes
- [ ] Reminders near deadlines
- [ ] Mark as read functionality

---

## Phase 7: IVA Officer Portal 🟡 MEDIUM PRIORITY

### 7.1 IVA Dashboard Enhancement
**Location**: `src/features/iva-officer/pages/Dashboard.jsx`

- [ ] New village verification tasks card
- [ ] Eligible marked card
- [ ] Not eligible marked card
- [ ] Committee/Agency verification tasks card
- [ ] "Visits this week" list

### 7.2 Village Eligibility Verification Inbox
**Location**: `src/features/iva-officer/pages/Assignments.jsx`

- [ ] List forwarded from State:
  - Application ID, Village, Sarpanch
  - Date assigned, deadline, status
- [ ] Click → detail page
- [ ] Filter by status, district
- [ ] Search functionality

### 7.3 Village Verification Detail
**Location**: `src/features/iva-officer/pages/VerificationDetail.jsx`

**View Section**:
- [ ] Show Sarpanch application
- [ ] Show uploaded photos

**IVA Checklist**:
- [ ] Confirm demographic detail (population, SC/ST data) - checkbox
- [ ] Confirm existing infrastructure - checkbox
- [ ] Confirm proposed work is genuinely needed - checkbox
- [ ] Visit date (date picker)
- [ ] Upload visit photos (geo-tagged)
- [ ] Final decision: Eligible / Not eligible (radio buttons)
- [ ] Remarks (textarea)
- [ ] Submit button
- [ ] Status back to State, visible to Sarpanch

### 7.4 Committee & Agency Verification Tasks
**Location**: `src/features/iva-officer/pages/CommitteeVerification.jsx`

**Tasks List**:
- [ ] Project, Village, Agency, Sarpanch, type of task

**Task Detail**:
- [ ] Committee resolution & member details
- [ ] Agency profile

**Verification Form**:
- [ ] Confirm committee members exist and are genuine (checkbox)
- [ ] Confirm agency office exists and is active (checkbox)
- [ ] Upload photos (geo-tagged)
- [ ] Final status: Verified / Not verified (radio buttons)
- [ ] Remarks (textarea)
- [ ] Submit button
- [ ] Send result to State

### 7.5 Verification History
**Location**: `src/features/iva-officer/pages/Reports.jsx`

- [ ] Show all verifications done by IVA officer
- [ ] Filters: village, project, date
- [ ] Export functionality
- [ ] Detailed view of each verification

---

## Phase 8: Shared Features & Components 🔴 HIGH PRIORITY

### 8.1 Notification System
**Location**: `src/shared/components/NotificationCenter.jsx`

- [ ] In-app notification component
- [ ] Email notification integration
- [ ] Notification types:
  - Status updates
  - Approvals
  - Fund releases
  - Inspections
  - Tender deadlines
- [ ] Real-time updates (WebSocket or polling)
- [ ] Notification preferences

### 8.2 Global Project Search
**Location**: `src/shared/components/GlobalSearch.jsx`

- [ ] Search by:
  - Project ID
  - Application ID
  - Village name
  - Agency name
  - Sarpanch name
- [ ] Search results page
- [ ] Quick access from navbar
- [ ] Recent searches

### 8.3 Project Timeline Component
**Location**: `src/shared/components/ProjectTimeline.jsx`

- [ ] Flipkart-style tracking component
- [ ] Stages:
  - Application Submitted
  - IVA Verification
  - State Review
  - Center Approval
  - Tender Released
  - Agency Selected
  - Work Started
  - Inspections
  - Completion
- [ ] Visual progress indicator
- [ ] Timestamps and actors for each stage
- [ ] Status badges

### 8.4 Document Upload Component
**Location**: `src/shared/components/DocumentUpload.jsx`

- [ ] Drag-and-drop file upload
- [ ] File type validation
- [ ] File size validation
- [ ] Multiple file upload
- [ ] Preview functionality
- [ ] Delete uploaded files
- [ ] Progress indicator

### 8.5 Geo-Tagged Photo Upload Component
**Location**: `src/shared/components/GeoPhotoUpload.jsx`

- [ ] Capture geo-location
- [ ] Photo upload with location metadata
- [ ] Display location on map
- [ ] Photo preview
- [ ] Validation: geo-tag required
- [ ] Multiple photo sets

### 8.6 Export Functionality
**Location**: `src/shared/utils/export.js`

- [ ] Export to Excel
- [ ] Export to PDF
- [ ] Table data export
- [ ] Report export
- [ ] Custom formatting

### 8.7 Charts & Analytics Components
**Location**: `src/shared/components/Charts/`

- [ ] Bar chart component
- [ ] Line chart component
- [ ] Pie chart component
- [ ] Progress chart component
- [ ] Use Chart.js or Recharts library

---

## Phase 9: Backend Integration 🔴 HIGH PRIORITY

### 9.1 API Endpoints Required

**Authentication**:
- [ ] POST /api/auth/register - User registration
- [ ] POST /api/auth/login - User login
- [ ] POST /api/auth/verify-face - Face authentication
- [ ] POST /api/auth/logout - User logout
- [ ] GET /api/auth/me - Get current user

**User Management**:
- [ ] GET /api/users/pending - Get pending registrations
- [ ] PUT /api/users/:id/approve - Approve user
- [ ] PUT /api/users/:id/reject - Reject user
- [ ] GET /api/users - Get all users (with filters)
- [ ] PUT /api/users/:id/activate - Activate user
- [ ] PUT /api/users/:id/deactivate - Deactivate user

**Applications (Sarpanch)**:
- [ ] POST /api/applications - Create new application
- [ ] GET /api/applications - Get applications (role-based)
- [ ] GET /api/applications/:id - Get application details
- [ ] PUT /api/applications/:id - Update application
- [ ] DELETE /api/applications/:id - Delete application

**State Actions**:
- [ ] POST /api/applications/:id/forward-to-iva - Forward to IVA
- [ ] POST /api/applications/:id/reject - Reject application
- [ ] POST /api/applications/:id/forward-to-center - Forward to Center

**IVA Actions**:
- [ ] POST /api/verifications - Create verification
- [ ] PUT /api/verifications/:id - Update verification
- [ ] GET /api/verifications - Get verifications

**Center Actions**:
- [ ] POST /api/consent-notes - Issue consent note
- [ ] POST /api/fund-releases - Release fund installment
- [ ] GET /api/projects - Get all projects
- [ ] GET /api/projects/:id - Get project details

**Tenders**:
- [ ] POST /api/tenders - Create tender
- [ ] GET /api/tenders - Get tenders
- [ ] GET /api/tenders/:id - Get tender details
- [ ] POST /api/tenders/:id/apply - Apply to tender
- [ ] PUT /api/tenders/:id/finalize - Finalize agency selection

**Inspections**:
- [ ] POST /api/inspections - Schedule inspection
- [ ] PUT /api/inspections/:id - Update inspection
- [ ] POST /api/inspections/:id/submit - Submit inspection report
- [ ] GET /api/inspections - Get inspections

**Notifications**:
- [ ] GET /api/notifications - Get user notifications
- [ ] PUT /api/notifications/:id/read - Mark as read
- [ ] POST /api/notifications - Create notification

**Reports**:
- [ ] GET /api/reports/funds - Fund reports
- [ ] GET /api/reports/projects - Project reports
- [ ] GET /api/reports/inspections - Inspection reports

### 9.2 Database Schema

**Users Table**:
- [ ] id, email, password_hash, role, full_name, mobile, department, state, district, status, face_data, created_at, updated_at

**Applications Table**:
- [ ] id, sarpanch_id, village_name, gp, block, district, state, population, sc_st_population, bpl_households, project_type, justification, estimated_cost, status, created_at, updated_at

**Photos Table**:
- [ ] id, application_id, photo_url, geo_lat, geo_lng, photo_type, created_at

**Verifications Table**:
- [ ] id, application_id, iva_officer_id, demographic_confirmed, infrastructure_confirmed, work_needed_confirmed, visit_date, decision, remarks, created_at

**Projects Table**:
- [ ] id, application_id, project_id, approved_amount, consent_note_url, status, created_at, updated_at

**Fund Releases Table**:
- [ ] id, project_id, installment_number, amount, release_date, transaction_ref, from_role, to_role, created_at

**Tenders Table**:
- [ ] id, project_id, sarpanch_id, eligibility_criteria, scope_of_work, start_date, end_date, status, created_at

**Tender Applications Table**:
- [ ] id, tender_id, agency_id, proposed_cost, methodology, budget_pdf_url, proposal_pdf_url, status, created_at

**Committees Table**:
- [ ] id, tender_id, member_name, role, contact, id_proof_url, created_at

**Inspections Table**:
- [ ] id, project_id, field_officer_id, inspection_number, scheduled_date, agency_head_name, quality_rating, completion_percentage, remarks, status, created_at

**Inspection Photos Table**:
- [ ] id, inspection_id, photo_url, photo_set, geo_lat, geo_lng, created_at

**Notifications Table**:
- [ ] id, user_id, title, message, type, is_read, created_at

### 9.3 File Storage
- [ ] Set up file storage (AWS S3, Cloudinary, or local storage)
- [ ] Photo upload endpoint
- [ ] PDF upload endpoint
- [ ] Document download endpoint
- [ ] File validation and security

---

## Phase 10: Testing & Quality Assurance 🟡 MEDIUM PRIORITY

### 10.1 Unit Testing
- [ ] Test authentication flows
- [ ] Test form validations
- [ ] Test API integrations
- [ ] Test utility functions

### 10.2 Integration Testing
- [ ] Test complete workflows:
  - Sarpanch application → IVA → State → Center
  - Tender creation → Agency application → Selection
  - Fund release flow
  - Inspection flow

### 10.3 User Acceptance Testing
- [ ] Test with actual users from each role
- [ ] Gather feedback
- [ ] Fix bugs and issues
- [ ] Improve UX based on feedback

### 10.4 Performance Testing
- [ ] Load testing
- [ ] Optimize slow queries
- [ ] Optimize large file uploads
- [ ] Optimize image loading

---

## Phase 11: Deployment & DevOps 🟢 LOW PRIORITY

### 11.1 Production Build
- [ ] Optimize build configuration
- [ ] Environment variables setup
- [ ] Production API endpoints
- [ ] Error tracking (Sentry)

### 11.2 Deployment
- [ ] Deploy backend (Node.js server)
- [ ] Deploy frontend (Vercel, Netlify, or custom server)
- [ ] Set up database (PostgreSQL, MySQL)
- [ ] Set up file storage
- [ ] Configure domain and SSL

### 11.3 Monitoring
- [ ] Set up application monitoring
- [ ] Set up error logging
- [ ] Set up performance monitoring
- [ ] Set up uptime monitoring

---

## 📊 Priority Matrix

| Priority | Phase | Estimated Time |
|----------|-------|----------------|
| 🔴 **HIGH** | Phase 1: Global Registration | 2-3 weeks |
| 🔴 **HIGH** | Phase 8: Shared Components | 1-2 weeks |
| 🔴 **HIGH** | Phase 9: Backend Integration | 3-4 weeks |
| 🟡 **MEDIUM** | Phase 2: Center Portal | 2-3 weeks |
| 🟡 **MEDIUM** | Phase 3: State Portal | 2-3 weeks |
| 🟡 **MEDIUM** | Phase 6: Field Officer Portal | 1-2 weeks |
| 🟡 **MEDIUM** | Phase 7: IVA Officer Portal | 1-2 weeks |
| 🟡 **MEDIUM** | Phase 10: Testing & QA | 2-3 weeks |
| 🟢 **PARTIALLY COMPLETE** | Phase 4: Sarpanch Portal | 1-2 weeks |
| 🟢 **PARTIALLY COMPLETE** | Phase 5: Agency Portal | 1-2 weeks |
| 🟢 **LOW** | Phase 11: Deployment | 1 week |

**Total Estimated Time**: 18-28 weeks (4.5-7 months)

---

## 🎯 Recommended Implementation Order

### Sprint 1-2 (Weeks 1-4): Foundation
1. Complete Phase 1: Global Registration System
2. Complete Phase 8: Shared Components (Timeline, Document Upload, Geo-Photo)
3. Set up basic backend API structure

### Sprint 3-4 (Weeks 5-8): Core Workflows
1. Complete Phase 4: Sarpanch Portal (Application Form)
2. Complete Phase 7: IVA Officer Portal (Verification)
3. Complete Phase 3: State Portal (Application Review)
4. Backend APIs for application flow

### Sprint 5-6 (Weeks 9-12): Approval & Funding
1. Complete Phase 2: Center Portal (Consent Notes, Fund Releases)
2. Complete Phase 3: State Portal (Fund Management)
3. Backend APIs for approvals and funding

### Sprint 7-8 (Weeks 13-16): Tenders & Inspections
1. Complete Phase 4: Sarpanch Portal (Tender Management)
2. Complete Phase 5: Agency Portal (Tender Applications)
3. Complete Phase 6: Field Officer Portal (Inspections)
4. Backend APIs for tenders and inspections

### Sprint 9-10 (Weeks 17-20): Polish & Testing
1. Complete Phase 10: Testing & QA
2. Bug fixes and improvements
3. Performance optimization
4. User feedback integration

### Sprint 11 (Weeks 21-22): Deployment
1. Complete Phase 11: Deployment & DevOps
2. Production deployment
3. Monitoring setup
4. Documentation

---

## 📝 Notes

- This roadmap is based on the global system prompt requirements
- Current implementation has basic infrastructure in place
- Focus should be on high-priority items first
- Backend development should happen in parallel with frontend
- Regular testing throughout development is crucial
- User feedback should be incorporated continuously

---

**Document Version**: 1.0  
**Last Updated**: 2025-12-02  
**Status**: Planning Phase
