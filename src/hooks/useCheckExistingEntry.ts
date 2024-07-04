/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { ExistingEntry } from "../types/appTypes"

export const useCheckExistingEntry = (
  userData: User | any,
  selectedDate: string
) => {
  const [existingEntry, setExistingEntry] = useState<ExistingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("dailyLogs")
          .select("*")
          .eq("user_id", userData?.id)
          .eq("date", selectedDate);
        //   .single();

        if (error) throw error;

        setExistingEntry(data); // Store the existing entry if found
      } catch (error: unknown) {
        console.error("Error fetching existing entry:", error);
        // @ts-expect-error(please, it is expected 😭)
        setError(error); // Set error state for handling
      } finally {
        setIsLoading(false);
      }
    };

    if (userData?.id && selectedDate) {
      fetchData();
    }
  }, [userData, selectedDate]); // Re-run on changes to userData or selectedDate

  return { existingEntry, isLoading, error };
};
