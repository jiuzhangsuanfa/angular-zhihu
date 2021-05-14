export interface User {

  id: any;
  name: string;
  head: string;
  motto: string;

}

export type UserID = User['id'];
