import { Car } from "./car";

export interface CarDetails extends Car {
    carId: number;
    carName: string;
    brandName: string;
    colorName: string;
    dailyPrice: number;
    modelYear: number;
    descriptions:string;
    findeksPoint:number;
 }