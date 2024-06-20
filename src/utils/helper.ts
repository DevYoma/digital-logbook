export function formatDate(date: Date) {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get full weekday name (e.g., Friday)
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const suffix = getDaySuffix(day);
  
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