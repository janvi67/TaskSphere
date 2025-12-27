import { ClipboardList, Loader, CheckCircle, CalendarDays } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, icon: Icon, color }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl p-5 shadow-md transition-all duration-300
      hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br ${color}
    `}
  >
    <div className="flex items-center justify-between">
      <p className="text-white text-sm">{title}</p>
      <div className="bg-white/20 p-3 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
  </div>
);

const StaffDashboard = () => {
  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your daily assignments and progress
        </p>
      </div>

      {/* Task Summary */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <StatCard
          title="Assigned Tasks"
          icon={ClipboardList}
          color="from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="In Progress"
          icon={Loader}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Completed"
          icon={CheckCircle}
          color="from-emerald-500 to-emerald-600"
        />
      </div>

      {/* Today’s Work */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Today’s Work
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          Your daily assigned tasks will appear here. Stay focused and keep
          things moving forward 🚀
        </p>

        {/* Placeholder empty state */}
        <div className="mt-6 border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 text-sm">
          No tasks assigned for today.
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
