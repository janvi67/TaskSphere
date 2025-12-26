import useDashboardStats from "../../hooks/useDashboardStats";

const TeamLeaderDashboard = () => {
  const {
    teamTasks = 0,
    completedTasks = 0,
    pendingTasks = 0
  } = useDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Team Leader Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">Team Tasks: {teamTasks}</div>
        <div className="card">Completed: {completedTasks}</div>
        <div className="card">Pending: {pendingTasks}</div>
      </div>
    </div>
  );
};

export default TeamLeaderDashboard;
