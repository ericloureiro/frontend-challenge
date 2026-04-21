import { Post } from "@/types";
import { DESCRIPTION_LIST, TAG_LIST, TITLE_LIST } from "./constants";

function randomFrom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTags() {
  const shuffled = [...TAG_LIST].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
}

export function generatePost(): Post {
  // Max number of ids available to show avatar in dummy endpoint
  const id = String(Math.floor(Math.random() * 70));

  return {
    id,
    title: randomFrom(TITLE_LIST),
    body: randomFrom(DESCRIPTION_LIST),
    tags: randomTags(),
    reactions: {
      likes: Math.floor(Math.random() * 500),
      dislikes: Math.floor(Math.random() * 50),
    },
    views: Math.floor(Math.random() * 5000),
    userId: Math.floor(Math.random() * 100),
  };
}
