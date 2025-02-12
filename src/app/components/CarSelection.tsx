"use client";

import { ChangeEvent } from "react";
import { VehicleType } from "../api/types";

interface CarSelectionProps {
  allCars: VehicleType[];
  handleCarChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CarSelection({
  allCars,
  handleCarChange,
}: CarSelectionProps) {
  return (
    <div className="text-left pt-5 pl-5">
      <select
        name="carSelection"
        id="carSelection"
        defaultValue=""
        className="bg-cyan-300"
        onChange={(e) => handleCarChange(e)}
      >
        <option value="" disabled>
          Choose a mark
        </option>
        {allCars && allCars.length > 0
          ? allCars.map((car) => (
              <option
                key={car.MakeId}
                value={car.MakeId}
                id={String(car.MakeId)}
              >
                {car.MakeName}
              </option>
            ))
          : null}
      </select>
    </div>
  );
}
