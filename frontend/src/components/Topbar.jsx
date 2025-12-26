import useAuthStore from "../store/authStore";

const Topbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-14 bg-white border-b px-6 flex items-center justify-between">
      <span className="font-semibold">
        {user?.role.replace("_", " ")} Dashboard
      </span>

      <button
        onClick={logout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
