import { Author } from "./Author";

export type Post = {
  id: number;
  body: string;
  author: Author;
};
