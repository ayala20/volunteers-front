export interface IVolunteer {
  id?: string;
  full_name: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  id_number: string;
  password: string;
}

export interface IVolunteerCreate {
  full_name: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  id_number: string;
  password: string;
}
