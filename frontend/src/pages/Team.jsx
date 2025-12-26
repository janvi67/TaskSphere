import { useEffect, useState } from "react";
import { fetchTeam } from "../services/teamService";

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam().then(res => setTeam(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Team</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {team.map(m => (
          <div key={m._id} className="card">
            <p className="font-semibold">{m.name}</p>
            <p className="text-sm text-gray-500">{m.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
