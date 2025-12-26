import { useEffect, useState } from "react";
import { fetchTaskReport } from "../services/reportService";

const Reports = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    fetchTaskReport().then((res) => {
      setReport(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Task Report</h1>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="table-th">Task Name</th>
              <th className="table-th">Status</th>
              <th className="table-th">Assigned To</th>
              <th className="table-th">Assigned By</th>
              {/* <th className="table-th">Completed At</th> */}
            </tr>
          </thead>

          <tbody>
            {report.length === 0 ? (
              <tr>
                <td colSpan="5" className="table-td text-center">
                  No report data
                </td>
              </tr>
            ) : (
              report.map((r) => (
                <tr key={r.taskId}>
                  <td className="table-td">{r.taskName}</td>

                  <td className="table-td">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          r.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : r.status === "IN_PROGRESS"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="table-td">{r.assignedTo}</td>
                  <td className="table-td">{r.assignedBy}</td>

                  {/* <td className="table-td">
                    {r.completedAt
                      ? new Date(r.completedAt).toLocaleString()
                      : "-"}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
