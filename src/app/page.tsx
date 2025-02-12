"use client";

import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { getAllCars } from "./api/api";
import { VehicleType } from "./api/types";
import CarSelection from "./components/CarSelection";
import Loading from "./components/Loading";
import Link from "next/link";
import YearSelection from "./components/YearSelection";

export default function Home() {
  const [allCars, setAllCars] = useState<VehicleType[] | []>([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const isNextButtonDisabled = !selectedCar || !selectedYear;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        if ("Results" in allCars) {
          const allCarsSelectionOptions = allCars.Results;
          setAllCars(allCarsSelectionOptions);
        } else {
          throw new Error("Error");
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    };

    fetchCars();
  }, []);

  function handleCarChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCar(event.target.value);
  }

  function handleYearChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value);
  }

  if (allCars.length === 0) {
    return <Loading />;
  }

  return (
    <main className="space-x-4">
      <menu className="flex items-center">
        <Suspense fallback={<Loading />}>
          <CarSelection allCars={allCars} handleCarChange={handleCarChange} />
          <YearSelection handleYearChange={handleYearChange} />
        </Suspense>
      </menu>
      <section>
        <Link
          href={
            isNextButtonDisabled
              ? "#"
              : `/result/${selectedCar}/${selectedYear}`
          }
        >
          <button
            disabled={isNextButtonDisabled}
            className={`${
              isNextButtonDisabled ? "bg-slate-200" : "bg-cyan-300"
            } mt-4 ml-1`}
          >
            Next
          </button>
        </Link>
      </section>
    </main>
  );
}
