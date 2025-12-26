const StaffDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Staff Dashboard</h1>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card">Assigned Tasks</div>
        <div className="card">In Progress</div>
        <div className="card">Completed</div>
      </div>

      {/* Work Section */}
      <div className="card">
        <h2 className="font-semibold mb-3">Today’s Work</h2>
        <p className="text-sm text-gray-500">
          Your daily assigned tasks will be shown here.
        </p>
      </div>
    </div>
  );
};

export default StaffDashboard;
