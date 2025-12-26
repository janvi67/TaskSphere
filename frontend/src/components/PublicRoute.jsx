import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("role")); // must store user on login

  if (token && role) {
    switch (role) {
      case "SUPER_ADMIN":
        return <Navigate to="/dashboard/super-admin" replace />;
      case "ADMIN":
        return <Navigate to="/dashboard/super-admin" replace />;
      case "TEAM_LEADER":
        return <Navigate to="/dashboard/team-leader" replace />;
      case "STAFF":
        return <Navigate to="/dashboard/staff" replace />;
      case "EMPLOYEE":
        return <Navigate to="/dashboard/employee" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // 🔓 Not logged in → allow public routes (login)
  return <Outlet />;
}
