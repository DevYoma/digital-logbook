export function formatDate(date: Date, returnInDateFormat?: boolean) {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get full weekday name (e.g., Friday)
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const suffix = getDaySuffix(day);
  if(returnInDateFormat){
    return `${day} ${month}`;
  }
  return `${dayOfWeek}, ${day}${suffix} of ${month}`;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatSelectedDate(dateString: string) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  const getOrdinalSuffix = (n: any) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

  // SELECT FIELD DYNAMIC MONTH GENERATION
export const generateMonthOptions = (startDate: Date, duration: number) => {
   const months = [];
   let currentMonth = startDate.getMonth();
   let currentYear = startDate.getFullYear();

   for (let i = 0; i < duration; i++) {
     const monthDate = new Date(currentYear, currentMonth, 1);
     const monthName = monthDate.toLocaleDateString("default", {
       month: "long",
     });
     months.push({
       monthIndex: currentMonth,
       monthName,
     });

     currentMonth += 1;
     if (currentMonth > 11) {
       currentMonth = 0;
       currentYear += 1;
     }
   }

   return months;
 };