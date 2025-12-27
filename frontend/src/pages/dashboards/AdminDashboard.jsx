import useDashboardStats from "../../hooks/useDashboardStats";
import { Users, ClipboardList, CheckCircle, Clock } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl p-5 shadow-md transition-all duration-300
      hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br ${color}
    `}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white/80">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className="bg-white/20 p-3 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
  </div>
);

const AdminDashboard = () => {
  const {
    totalUsers = 0,
    totalTasks = 0,
    completedTasks = 0,
    pendingTasks = 0
  } = useDashboardStats();

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of users and task activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={ClipboardList}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          icon={CheckCircle}
          color="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={Clock}
          color="from-amber-500 to-amber-600"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
