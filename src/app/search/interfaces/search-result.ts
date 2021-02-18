import { Answer, Question } from "src/app/common/interfaces";

export interface SearchResult {

  id: number;
  question: Partial<Question>;
  answer: Partial<Answer>;

}
