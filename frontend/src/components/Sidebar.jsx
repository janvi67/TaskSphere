/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart2,
  UsersRound
} from "lucide-react";

const menuConfig = {
  SUPER_ADMIN: [
    { label: "Dashboard", path: "/dashboard/super-admin", icon: LayoutDashboard },
    { label: "Users", path: "/users", icon: Users },
    { label: "Tasks", path: "/tasks", icon: ClipboardList },
    { label: "Reports", path: "/reports", icon: BarChart2 }
  ],
  ADMIN: [
    { label: "Dashboard", path: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", path: "/users", icon: Users },
    { label: "Tasks", path: "/tasks", icon: ClipboardList },
    { label: "Reports", path: "/reports", icon: BarChart2 }
  ],
  TEAM_LEADER: [
    { label: "Dashboard", path: "/dashboard/team-leader", icon: LayoutDashboard },
    { label: "Tasks", path: "/tasks", icon: ClipboardList },
    { label: "Team", path: "/team", icon: UsersRound }
  ],
  STAFF: [
    { label: "Dashboard", path: "/dashboard/staff", icon: LayoutDashboard },
    { label: "Tasks", path: "/tasks", icon: ClipboardList }
  ],
  EMPLOYEE: [
    { label: "Dashboard", path: "/dashboard/employee", icon: LayoutDashboard },
    { label: "My Tasks", path: "/tasks", icon: ClipboardList }
  ]
};

const Sidebar = () => {
  const { user } = useAuthStore(); // reactive

  const menu = menuConfig[user?.role] || [];

  return (
    <aside className="w-64 bg-white border-r border-gray-300 h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-bold text-indigo-600 mb-8 text-center">
        Admin TMS
      </h2>

      <nav className="space-y-1 flex-1">
   
        {menu.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}  
            to={path}  
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-4">
        © {new Date().getFullYear()} TMS
      </div>
    </aside>
  );
};

export default Sidebar;
