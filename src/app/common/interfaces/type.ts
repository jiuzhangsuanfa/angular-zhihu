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
  INIT = 'init',
  LOADING = 'loading',
  SUCCEED = 'succeed',
  FAILED = 'failed',
  CANCEL = 'cancel',
}

export enum ToolbarType {
  CUSTOM = 'custom',
  SEARCH = 'search',
  ACTION = 'action',
}
