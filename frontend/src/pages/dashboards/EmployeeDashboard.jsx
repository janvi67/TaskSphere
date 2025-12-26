import useDashboardStats from "../../hooks/useDashboardStats";

const EmployeeDashboard = () => {
  const {
    myTasks = 0,
    completedTasks = 0,
    pendingTasks = 0
  } = useDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">My Tasks: {myTasks}</div>
        <div className="card">Completed: {completedTasks}</div>
        <div className="card">Pending: {pendingTasks}</div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
