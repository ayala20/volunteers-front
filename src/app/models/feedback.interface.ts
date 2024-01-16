import { IFreeActivity } from "./freeActivity.interface";

export interface IFeedBack {
  feedback_id: string;
  date: Date;
  rating: number;
  note: string;
  idFreeActivity: IFreeActivity;
}

export interface IFeedBackCreate {
  date: Date;
  rating: number;
  note: string;
  idFreeActivity: string;
}
