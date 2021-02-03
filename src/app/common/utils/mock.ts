import { Random, mock } from 'mockjs';
import { AnswerID, QuestionID, UserID } from '../interfaces';

export const mockVote = (id?: number) => ({
  id: id ?? Random.increment(),
  count: Random.integer(0, 99999),
});

export const mockQuestion = (id?: QuestionID) => ({
  id: id ?? Random.increment(),
  title: Random.ctitle(),
  content: Random.cparagraph(),
  count: {
    answer: Random.integer(0, 99999),
    visit: Random.integer(0, 99999),
    like: Random.integer(0, 99999),
  },
  tags: mock({
    'array|0-10': [() => Random.cword(2, 5)],
  })['array'],
  date: new Date(Random.datetime()),
});

export const mockAnswer = (id?: AnswerID) => ({
  id: id ?? Random.increment(),
  title: Random.ctitle(),
  images: mock({
    'array|0-10': [Random.image()],
  })['array'],
  content: Random.cparagraph(),
  count: {
    approve: Random.integer(0, 99999),
    oppose: Random.integer(0, 99999),
    comment: Random.integer(0, 99999),
  },
  date: new Date(Random.datetime()),
});

export const mockUser = (id?: UserID) => ({
  id: id ?? Random.increment(),
  name: Random.cname(),
  head: Random.image('128x128'),
  motto: Random.csentence(),
});
