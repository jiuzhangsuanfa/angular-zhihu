import { User } from './user';

export interface Question {

  /** 问题 ID */
  id: number;

  /** 问题标题 */
  title: string;

  /** 封面 */
  cover?: string;

  /** 提问用户 */
  user: User;

  /** 问题内容 */
  content?: string;

  /** 回答数量等 */
  count: {
    answer: number;
    visit: number;
    like: number;
  };

  /** 问题标签 */
  tags: string[];

  /** 创建时间 */
  date: Date;

}

export type QuestionID = Question['id'];
