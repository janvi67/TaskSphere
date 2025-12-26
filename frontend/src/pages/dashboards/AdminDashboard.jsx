import useDashboardStats from "../../hooks/useDashboardStats";

const AdminDashboard = () => {
  const {
    totalUsers = 0,
    totalTasks = 0,
    completedTasks = 0,
    pendingTasks = 0
  } = useDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="card">Users: {totalUsers}</div>
        <div className="card">Tasks: {totalTasks}</div>
        <div className="card">Completed: {completedTasks}</div>
        <div className="card">Pending: {pendingTasks}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
