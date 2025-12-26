import { useEffect, useState, useCallback, useRef } from "react";
import {
  fetchTasks,
  updateTaskStatus,
  fetchTaskHistory
} from "../services/taskService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // always array
  const [history, setHistory] = useState([]);
  console.log("🚀 ~ Tasks ~ history:", history)
  const [selectedTask, setSelectedTask] = useState(null);
  const fetchedRef = useRef(false);

  const loadTasks = useCallback(async () => {
    try {
      const res = await fetchTasks();

      // ✅ normalize response
      const taskList = Array.isArray(res.data)
        ? res.data
        : res.data?.tasks || [];

      setTasks(taskList);
    } catch (err) {
      console.error("Failed to load tasks", err);
      setTasks([]); // fail-safe
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadTasks();
  }, [loadTasks]);

  const changeStatus = async (id, status) => {
    await updateTaskStatus(id, {
      status,
      comment: "Updated from dashboard"
    });
    loadTasks();
  };

  const openHistory = async (taskId) => {
    console.log("🚀 ~ openHistory ~ taskId:", taskId)
    const res = await fetchTaskHistory(taskId);
    console.log("🚀 ~ openHistory ~ res:", res.data?.histories)
    setHistory(Array.isArray(res.data?.histories) ? res.data?.histories : []);
    setSelectedTask(taskId);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-th">Title</th>
              <th className="table-th">Status</th>
              <th className="table-th">Action</th>
              <th className="table-th">History</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="table-td text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((t) => (
                <tr key={t._id}>
                  <td className="table-td">{t.title}</td>
                  <td className="table-td">{t.status}</td>
                  <td className="table-td">
                    <select
                      className="border p-1"
                      value={t.status}
                      onChange={(e) =>
                        changeStatus(t._id, e.target.value)
                      }
                    >
                      <option>PENDING</option>
                      <option>IN_PROGRESS</option>
                      <option>COMPLETED</option>
                    </select>
                  </td>
                  <td className="table-td">
                    <button
                      className="text-primary underline"
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

      {/* History Modal */}
{/* History Modal */}
{selectedTask && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-4 rounded w-[700px] max-h-[80vh] overflow-y-auto">
      <h3 className="font-semibold mb-3">Task History</h3>

      {history.length === 0 ? (
        <p className="text-sm text-gray-500">No history found</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="table-th">Task</th>
              <th className="table-th">Status</th>
              <th className="table-th">Comment</th>
              <th className="table-th">Updated By</th>
              <th className="table-th">Created At</th>
            </tr>
          </thead>

          <tbody>
            {history.map((h) => (
              <tr key={h._id}>
                <td className="table-td">
                  {h.task?.title || "N/A"}
                </td>

                <td className="table-td">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        h.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : h.status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {h.status}
                  </span>
                </td>

                <td className="table-td">
                  {h.comment || "-"}
                </td>

                <td className="table-td">
                  {h.updatedBy?.name} ({h.updatedBy?.role})
                </td>

                <td className="table-td">
                  {new Date(h.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="btn-primary mt-4"
        onClick={() => setSelectedTask(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Tasks;
