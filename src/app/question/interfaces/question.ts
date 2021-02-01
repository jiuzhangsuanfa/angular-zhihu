export interface Question {

  /** 问题 ID */
  id: string;

  /** 问题标题 */
  title: string;

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

}
