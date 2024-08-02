import "./Calendar.scss"

const Calendar = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();   


    // Logic to calculate start and end dates of the month
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Logic to create the calendar grid structure
    const calendarData: any[] = [];
    // ... populate calendarData with dates and log entry information

      // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth   
 + 1, 0).getDate();

  // Logic to determine the starting day of the week for the month
  const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();


    // console.log(`${startOfMonth} and ${endOfMonth}`);
    console.log(`${daysInMonth} and ${startDayOfWeek}`);

    // let day = 1;

    // Create an array of days for the entire month
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(currentYear, currentMonth, index + 1);
    // return { date, hasLogEntry};
    return date
  });

  console.log(startOfMonth, endOfMonth, days, calendarData);


  return (
    <div className="calendar">
        <h3>Calendar component</h3>
      {/* {calendarData.map((week, weekIndex) => (
        <div key={weekIndex} className="calendar-week">
          {week.map((day, dayIndex) => (
            <DayBox
              key={`${weekIndex}-${dayIndex}`}
              date={day.date}
              hasLogEntry={day.hasLogEntry}
            />
          ))}
        </div>
      ))} */}
    </div>
  );
}

// function DayBox({ date, hasLogEntry }) {
//   return (
//     <div className={`day-box ${hasLogEntry ? "filled" : ""}`}>
//       {date.getDate()}
//     </div>
//   );
// }

export default Calendar