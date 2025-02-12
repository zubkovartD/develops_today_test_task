import { ChangeEvent } from "react";
import { years } from "./../constants/constants";

interface YearSelectionProps {
  handleYearChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function YearSelection({
  handleYearChange,
}: YearSelectionProps) {
  return (
    <div className="text-left pt-5 pl-5">
      <select
        name="carSelection"
        id="carSelection"
        defaultValue=""
        className="bg-cyan-300"
        onChange={(e) => handleYearChange(e)}
      >
        <option value="" disabled>
          Choose a year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
