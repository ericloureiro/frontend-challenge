import { Reactions } from "./Reactions";

export type Post = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
};
