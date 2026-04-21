import { Reactions } from "./Reactions";

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
};
