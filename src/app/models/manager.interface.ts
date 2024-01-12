import { IAssociation } from "./association.interface";

export interface IManager {
  id?: string;
  name: string;
  password: string;
  phone: string;
  email: string;
  association: IAssociation;
  passwordAssociation: string;
}

export interface IManagerCreate {
  name: string;
  password: string;
  phone: string;
  email: string;
  association: string;
  passwordAssociation: IAssociation;
}
