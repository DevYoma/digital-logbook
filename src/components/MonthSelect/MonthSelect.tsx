type Prop = {
    selectedMonth: number | null;
    monthOptions: {
        monthIndex: number; 
        monthName: string;
    }[];
    handleMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; 
}


const MonthSelect = ({ selectedMonth, monthOptions, handleMonthChange }: Prop) => {
  return (
    <select
        onChange={handleMonthChange}
        value={selectedMonth !== null ? selectedMonth : ""}
    >
        {monthOptions.map((option) => (
        <option key={option.monthIndex} value={option.monthIndex}>
            {option.monthName}
        </option>
        ))}
    </select>
  )
}

export default MonthSelect