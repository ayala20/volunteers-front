import { ICategory } from "./category.interface";
import { IDistrict } from "./district.interface";
import { IManager } from "./manager.interface";
import { IVolunteer } from "./volunteer.interface";

export interface IFreeActivity {
    freeActivity_id?: string;
    name: string;
    manager: IManager;
    category: ICategory;
    district: IDistrict;
    feedback?: string;
    volunteer?: IVolunteer;
    description?: string;
    dateAndTime: Date;
    address: string;
    status: string;
}

export interface IFreeActivityCreate {
    name: string;
    manager: string;
    category: string;
    district: string;
    volunteer?: string;
    description?: string;
    dateAndTime: Date;
    address: string;
}
