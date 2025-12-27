import { useEffect, useState } from "react";
import { fetchTeam } from "../services/teamService";
import { User } from "lucide-react";

const TeamCard = ({ member }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
        <User className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-800">{member.name}</p>
        <p className="text-sm text-gray-500">{member.email}</p>
      </div>
    </div>
  </div>
);

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam()
      .then((res) => setTeam(Array.isArray(res.data) ? res.data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Team</h1>
        <p className="text-gray-500 mt-1">
          Members working with you
        </p>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading team...</p>
      ) : team.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No team members found
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <TeamCard key={m._id} member={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
