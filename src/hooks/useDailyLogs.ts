import { useState, useEffect, useContext } from "react";
import { supabase } from "../supabase/supabaseClient";
import { UserAuthContext } from "../context/UserAuthContext";
import { ExistingEntry } from "../types/appTypes";

export const useDailyLogs = () => {
    const [dailyLogs, setDailyLogs] = useState<ExistingEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserAuthContext);
    const userDataStartDate = userData?.user_metadata?.startDate;
    const userDataDuration = userData?.user_metadata?.duration;

    const fetchDailyLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
            .from("dailyLogs")
            .select("*")
            .eq("user_id", userData?.id)
            .order("date", { ascending: false }); // latest first   

            if (error) throw error;

            setDailyLogs(data);
        } catch (error) {
            console.error("Error fetching daily logs:", error);
            alert("Error fetching logs. Please reload")
            setDailyLogs([]);
        } finally {
            setLoading(false);
        }
    };

    const filterLogsByMonth = (month: number): ExistingEntry[] => {
        return dailyLogs.filter((log) => {
            const logDate = new Date(log.date);
            return logDate.getMonth() === month;
        });
    };


    useEffect(() => {
        fetchDailyLogs();
    }, [userData]);

    return { dailyLogs, loading, fetchDailyLogs, setDailyLogs, filterLogsByMonth, userDataStartDate, userDataDuration };
};