import { carsURL } from "../constants/constants";
import { VehiclesResponse } from "./types";

export async function getAllCars(): Promise<VehiclesResponse | { error: string }> {
    try {
        const response  = await fetch(carsURL);
        const data: VehiclesResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        } else {
            return { error: "Unknown error" };
        }
    }
}