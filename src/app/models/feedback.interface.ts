export interface IFeedBack {
  feedback_id: string;
  date: Date;
  rating: number;
}

export interface IFeedBackCreate {
  date: Date;
  rating: number;
}
