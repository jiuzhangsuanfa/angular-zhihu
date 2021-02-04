import { mock, Random } from 'mockjs';
import { Answer, AnswerID, Question, QuestionID, User, UserID, Vote, VoteID } from '../interfaces';

export const mockVote: (id?: VoteID) => Vote = id => ({
  id: id ?? Random.increment(),
  count: Random.integer(0, 99999),
});

export const mockQuestion: (id?: QuestionID) => Question = id => ({
  id: id ?? Random.increment(),
  title: Random.ctitle(8, 15) + '？',
  user: mockUser(),
  cover: Math.random() > 0.5 ? Random.image() : undefined,
  content: Random.cparagraph(0, 30),
  count: {
    answer: Random.integer(0, 15000),
    visit: Random.integer(0, 999999),
    like: Random.integer(0, 50000),
  },
  tags: mock({
    'array|1-4': [() => Random.cword(2, 5)],
  })['array'],
  date: new Date(Random.datetime()),
});

export const mockAnswer: (id?: AnswerID) => Answer = id => ({
  id: Random.increment(),
  question: id!,
  user: mockUser(),
  covers: mock({
    'array|0-10': [Random.image()],
  })['array'],
  content: Random.cparagraph(0, 1000),
  count: {
    approve: Random.integer(0, 999999),
    oppose: Random.integer(0, 9999),
    comment: Random.integer(0, 99999),
  },
  date: new Date(Random.datetime()),
});

export const mockUser: (id?: UserID) => User = id => ({
  id: id ?? Random.increment(),
  name: Random.cname(),
  head: Random.image('128x128'),
  motto: Random.csentence(),
});
