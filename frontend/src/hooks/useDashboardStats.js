import { useEffect, useState, useCallback, useRef } from "react";
import { fetchDashboardStats } from "../services/dashboardService";

const useDashboardStats = () => {
  const [stats, setStats] = useState({});
  const fetchedRef = useRef(false);

  // ✅ memoized function
  const loadStats = useCallback(async () => {
    const res = await fetchDashboardStats();
    setStats(res.data);
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadStats();
  }, [loadStats]);

  return stats;
};

export default useDashboardStats;
