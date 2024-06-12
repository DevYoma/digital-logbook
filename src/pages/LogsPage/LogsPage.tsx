import { useContext, useEffect, useState } from "react";
import "./LogsPage.scss";
import { supabase } from "../../supabase/supabaseClient";
import { UserAuthContext } from "../../context/UserAuthContext";

const LogsPage = () => {
    const [dailyLogs, setDailyLogs] = useState<any[]>([]);
    const { userData } = useContext(UserAuthContext);

    // console.log(userData);

    useEffect(() => {
        const fetchDailyLogs = async () => {
        try {
            const { data, error } = await supabase
                .from('dailyLogs')
                .select('*')
                .eq('user_id', userData?.id)
                .order('date', { ascending: false }); // Order by date (latest first)
        
            if (error) throw error;
        
            setDailyLogs(data);
        } catch (error) {
            console.log(error);
            setDailyLogs([])
        }

    };

    fetchDailyLogs();
  }, []);

  return (
    <div className="dailyLogList">
      <h2>Your Daily Logs</h2>
      {dailyLogs.map((dailyLog) => (
        <div key={dailyLog.id} className="dailyLogItem">
          <p>Date: {dailyLog.date}</p>
          <p>{dailyLog.text}</p>
        </div>
      ))}
      {dailyLogs.length === 0 && (
        <p>You haven't submitted any daily logs yet.</p>
      )}
    </div>
  );
}

export default LogsPage