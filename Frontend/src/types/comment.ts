import { Category } from './category';

export default interface Comment {
  title: string,
  content: string,
  id: string,
  categories: Category[],
  pinned: boolean,
  reported: boolean,
}
