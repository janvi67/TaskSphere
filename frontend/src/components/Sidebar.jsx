import { NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";

const menuConfig = {
  SUPER_ADMIN: [
    { label: "Dashboard", path: "/dashboard/super-admin" },
    { label: "Users", path: "/users" },
    { label: "Tasks", path: "/tasks" },
    { label: "Reports", path: "/reports" }
  ],
  ADMIN: [
    { label: "Dashboard", path: "/dashboard/super-admin" },
    { label: "Users", path: "/users" },
    { label: "Tasks", path: "/tasks" },
    { label: "Reports", path: "/reports" }
  ],
  TEAM_LEADER: [
    { label: "Dashboard", path: "/dashboard/team-leader" },
    { label: "Tasks", path: "/tasks" },
    { label: "Team", path: "/team" }
  ],
  STAFF: [
    { label: "Dashboard", path: "/dashboard/staff" },
    { label: "Tasks", path: "/tasks" }
  ],
  EMPLOYEE: [
    { label: "Dashboard", path: "/dashboard/employee" },
    { label: "My Tasks", path: "/tasks" }
  ]
};

const Sidebar = () => {


    const user=localStorage.getItem("role");
    console.log("🚀 ~ Sidebar ~ user:", user)
 
  const menu = menuConfig[user] || [];

  return (
    <aside className="w-64 bg-white border-r h-screen p-4">
      <h2 className="text-xl font-bold text-primary mb-6">
        Admin TMS
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
