import { User, UserID } from './user';

// eslint-disable-next-line no-shadow
export enum AnswerStatus {
  approve = 'approve',
  oppose = 'oppose',
  none = 'none',
}

export interface Answer {

  id: any;
  questionId?: any;
  question: number;
  covers?: string[];
  user: User;
  //userId: UserID;
  content: string;
  count: {
    approve: number;
    oppose: number;
    comment: number;
  };
  date: Date;
  status: AnswerStatus;
}

export type AnswerID = Answer['id'];
