import { User } from './user';

export interface Answer {

  id: number;
  title: string;
  images?: string[];
  user: User;
  content: string;
  count: {
    approve: number;
    oppose: number;
    comment: number;
  }
  date: Date;

}

export type AnswerID = Answer['id'];
