import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeamLeaderDashboard from "./pages/dashboards/TeamLeaderDashboard";
import StaffDashboard from "./pages/dashboards/StaffDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";

import Tasks from "./pages/Tasks";
import Users from "./pages/User";
import Reports from "./pages/Reports";
import Team from "./pages/Team";

const App = () => (
  
  <BrowserRouter>
    <Routes>

      <Route element={<PublicRoute />}>
          {/* <Route path='/signup' element={<Signup />} / */}
          <Route path="/login" element={<Login />} />
          </Route>
       

      {/* 🔐 SUPER ADMIN / ADMIN */}
      <Route
        path="/dashboard/super-admin"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 🔐 TEAM LEADER */}
      <Route
        path="/dashboard/team-leader"
        element={
          <ProtectedRoute allowedRoles={["TEAM_LEADER"]}>
            <DashboardLayout>
              <TeamLeaderDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 🔐 STAFF */}
      <Route
        path="/dashboard/staff"
        element={
          <ProtectedRoute allowedRoles={["STAFF"]}>
            <DashboardLayout>
              <StaffDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 🔐 EMPLOYEE */}
      <Route
        path="/dashboard/employee"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <DashboardLayout>
              <EmployeeDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 🔐 COMMON PRIVATE PAGES */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Tasks />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "TEAM_LEADER"]}>
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/team"
        element={
          <ProtectedRoute allowedRoles={["TEAM_LEADER"]}>
            <DashboardLayout>
              <Team />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />



    </Routes>
  </BrowserRouter>
);

export default App;
