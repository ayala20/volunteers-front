export interface IAssociation {
  id?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  password?: string;
  file: string;
  logo_image?: string;
}

export interface IAssociationCreate {
  name: string;
  address: string;
  email: string;
  phone: string;
  file: string;
  logo_image?: string;
}
