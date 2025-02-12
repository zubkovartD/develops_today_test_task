"use server";

import { SpecificVehicleResponse, VehiclesResponse } from "@/app/api/types";
import { carsURL, years } from "@/app/constants/constants";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(carsURL);
  if (!response.ok) {
    console.error(
      "Failed to fetch data:",
      response.status,
      response.statusText
    );
    return [];
  }
  const data: VehiclesResponse = await response.json();

  return data.Results.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    }))
  );
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  if (!params) {
    throw new Error("Missing parameters for makeId or year");
  }
  const { makeId, year } = await params;

  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  const data: SpecificVehicleResponse = await response.json();

  if (!params || !makeId || !year) {
    return notFound();
  }

  return (
    <div>
      {data.Results ? (
        <ul className="flex gap-4 justify-center flex-col p-4">
          {data.Results.map((model) => (
            <li key={model.Model_ID} className="">
              <p className="text-lg">{model.Model_Name}</p>
              <p className="text-sm text-gray-500">
                Model ID: {model.Model_ID}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Cannot find a model</p>
      )}
    </div>
  );
}
