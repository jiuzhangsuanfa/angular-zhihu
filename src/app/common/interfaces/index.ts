export * from './answer';
export * from './question';
export * from './user';
export * from './vote';

export enum ResourceType {
  ANSWER = 'answer',
  ANSWERS = 'answers',
  QUESTION = 'question',
  QUESTIONS = 'questions',
  IMAGES = 'images',
  VOTES = 'votes',
  NONE = '',
}

export enum LoadingType {
  INIT = 0,
  LOADING = 1,
  SUCCEED = 2,
  FAILED = 3,
  CANCEL = 4,
}
