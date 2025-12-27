import { useEffect, useState, useCallback, useRef } from "react";
import {
  fetchTasks,
  updateTaskStatus,
  fetchTaskHistory
} from "../services/taskService";

const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETED: "bg-emerald-100 text-emerald-700",
    IN_PROGRESS: "bg-amber-100 text-amber-700",
    PENDING: "bg-gray-100 text-gray-600"
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  const loadTasks = useCallback(async () => {
    try {
      const res = await fetchTasks();
      const taskList = Array.isArray(res.data) ? res.data : res.data?.tasks || [];
      setTasks(taskList);
    } catch (err) {
      console.error("Failed to load tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadTasks();
  }, [loadTasks]);

  const changeStatus = async (id, status) => {
    await updateTaskStatus(id, { status, comment: "Updated from dashboard" });
    loadTasks();
  };

  const openHistory = async (taskId) => {
    const res = await fetchTaskHistory(taskId);
    setHistory(Array.isArray(res.data?.histories) ? res.data.histories : []);
    setSelectedTask(taskId);
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
        <p className="text-gray-500 mt-1">Manage and track all assigned tasks</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
                <th className="px-4 py-3 text-left font-semibold">History</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-400">
                    Loading tasks...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-400">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium">{t.title}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={t.status}
                        onChange={(e) => changeStatus(t._id, e.target.value)}
                      >
                        <option>PENDING</option>
                        <option>IN_PROGRESS</option>
                        <option>COMPLETED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="text-indigo-600 hover:underline font-medium"
                        onClick={() => openHistory(t._id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-4xl max-h-[80vh] overflow-y-auto animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Task History
            </h3>

            {history.length === 0 ? (
              <p className="text-sm text-gray-500">No history found</p>
            ) : (
              <table className="min-w-full text-sm text-gray-700 border rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Task</th>
                    <th className="px-3 py-2 text-left font-semibold">Status</th>
                    <th className="px-3 py-2 text-left font-semibold">Comment</th>
                    <th className="px-3 py-2 text-left font-semibold">Updated By</th>
                    <th className="px-3 py-2 text-left font-semibold">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h._id} className="border-t">
                      <td className="px-3 py-2">{h.task?.title || "N/A"}</td>
                      <td className="px-3 py-2">
                        <StatusBadge status={h.status} />
                      </td>
                      <td className="px-3 py-2">{h.comment || "-"}</td>
                      <td className="px-3 py-2">
                        {h.updatedBy?.name} ({h.updatedBy?.role})
                      </td>
                      <td className="px-3 py-2">
                        {new Date(h.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="mt-5 text-right">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={() => setSelectedTask(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
