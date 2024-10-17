import { useEffect, useState } from "react";
import MonthSelect from "../../components/MonthSelect/MonthSelect";
import Navbar from "../../components/Navbar/Navbar"
import { useDailyLogs } from "../../hooks/useDailyLogs"
import "./Summary.scss"
import { generateMonthOptions } from "../../utils/helper";
import { ExistingEntry } from "../../types/appTypes";

const Summary = () => {
  const { filterLogsByMonth, userDataDuration, userDataStartDate } = useDailyLogs();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [filteredLogs, setFilteredLogs] = useState<ExistingEntry[]>([]);
   const [summary, setSummary] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate month options for the select dropdown
  const monthOptions = [
    { monthIndex: -1, monthName: "Select Month" },
    ...generateMonthOptions(new Date(userDataStartDate), userDataDuration),
  ];

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value, 10);
    setSelectedMonth(month);

    // const filteredLogs = filterLogsByMonth(month);
    // console.log(filteredLogs);

    if (!isNaN(month)) {
      const filteredLogsForMonth = filterLogsByMonth(month);
      setFilteredLogs(filteredLogsForMonth);
    } else {
      setFilteredLogs([]); // Clear logs if no valid month is selected
    }

  };

   useEffect(() => {
     const fetchSummary = async () => {
       const contentToSummarize = filteredLogs.map((log) => log.text).join(" "); 
      //  console.log(contentToSummarize)

       if (contentToSummarize) {
         const url = "https://gpt-summarization.p.rapidapi.com/summarize";
         const options = {
           method: "POST",
           headers: {
             "x-rapidapi-key":
               "ef479af64emshec1f75e0c1c45ddp13ea88jsn1a6bda3664ba", 
             "x-rapidapi-host": "gpt-summarization.p.rapidapi.com",
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             text: contentToSummarize,
             prompt:"Summarize the key activities and achievements from these logs for the month, highlighting important tasks completed and any challenges faced. Provide a concise summary (3-5 sentences).",
             num_sentences: 4,
           }),
         };
         
         setIsLoading(true);
         try {
           const response = await fetch(url, options);
           const result = await response.json();
           console.log(result)
           setSummary(result.summary); // Adjust according to the actual response structure
         } catch (error) {
           console.error("Error fetching summary:", error);
         }finally{
          setIsLoading(false)
         }
       } else {
         setSummary(""); // Reset summary if no content to summarize
       }
     };

     if (filteredLogs.length > 0) {
       fetchSummary();
     }
   }, [filteredLogs]);

  // console.log(filteredLogs.map(logs => logs.text))

  return (
    <div className="summary">
      <div className="summaryMain">
        <Navbar />

        <div className="summaryMainContent">
          <h2>Summary Content</h2>
          <MonthSelect
            selectedMonth={selectedMonth}
            monthOptions={monthOptions}
            handleMonthChange={handleMonthChange}
          />
          {/* <div className="filteredLogsDisplay">
            {filteredLogs.length > 0 ? (
              <pre>{filteredLogs.map((log) => log.text).join("\n")}</pre>
            ) : (
              <p>No logs available for the selected month.</p>
            )}
          </div> */}

          <div style={{ marginTop: "2rem", border: "2px dashed red" }}>
            {isLoading ? (
              <p>Loading summary...</p> // Loading message
            ) : summary ? (
              <pre>{summary}</pre>
            ) : (
              <p>No summary available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary