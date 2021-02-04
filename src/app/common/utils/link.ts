import { AnswerID, QuestionID, ResourceType } from '../interfaces';

export class Link {

  private link: URL;

  constructor(private url: string) {
    this.link = new URL(url);
  }

  getResource(): ResourceType | undefined {
    return this.link.pathname.split('/').filter(v => v)[0] as (ResourceType | undefined);
  }

  getID(): QuestionID | AnswerID | undefined {
    const id = +this.link.pathname.split('/').filter(v => v)[1];
    return Number.isInteger(id) ? id : undefined;
  }

  getParam(key: string): string | undefined {
    return this.link.searchParams.get(key) || undefined;
  }

}
