export interface VehicleType {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
};
  
export interface VehiclesResponse {
    Count: number;
    Message: string;
    Results: VehicleType[];
};

export interface SpecificVehicleType {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string
}

export interface SpecificVehicleResponse {
  Count: number;
  Message: string;
  Results: SpecificVehicleType[];
  SearchCriteria: string
}