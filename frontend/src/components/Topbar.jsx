import useAuthStore from "../store/authStore";
import { LogOut, UserCircle } from "lucide-react";

const formatRole = (role) =>
  role
    ? role
        .toLowerCase()
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Dashboard";

const Topbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-300 px-6 flex items-center justify-between shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <UserCircle className="w-7 h-7 text-indigo-600" />
        <span className="text-lg font-semibold text-gray-800">
          {formatRole(user?.role)} Dashboard
        </span>
      </div>

      {/* Right */}
      <button
        onClick={logout}
        className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </header>
  );
};

export default Topbar;
