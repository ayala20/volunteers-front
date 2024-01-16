export interface IAssociation {
  id?: string;
  number: Number;
  name: string;
  address: string;
  email: string;
  phone: string;
  password?: string;
  file: string;
  logo_image?: string;
}

export interface IAssociationCreate {
  number: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  file: string;
  logo_image?: string;
}
