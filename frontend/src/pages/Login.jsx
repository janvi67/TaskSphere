import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const { login, user, loading } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  // 🔥 ROLE BASED REDIRECT
  useEffect(() => {
    if (user?.role) {
      switch (user.role) {
        case "SUPER_ADMIN":
          navigate("/dashboard/super-admin");
          break;
        case "ADMIN":
          navigate("/dashboard/admin");
          break;
        case "TEAM_LEADER":
          navigate("/dashboard/team-leader");
          break;
        case "STAFF":
          navigate("/dashboard/staff");
          break;
        case "EMPLOYEE":
          navigate("/dashboard/employee");
          break;
        default:
          navigate("/login");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="input mt-3"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="btn-primary w-full mt-4">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
