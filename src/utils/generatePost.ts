import { Post } from "@/types";

const titles = [
  "He never looked back again",
  "The truth was hidden in plain sight",
  "A moment that changed everything",
  "She didn't expect what happened next",
  "They were not ready for it",
  "Something strange was going on",
];

const bodies = [
  "He walked into the room and everything suddenly felt different. Nothing was as it seemed anymore.",
  "It started like any other day, but soon things escalated beyond control.",
  "No one believed him at first, but the evidence was undeniable.",
  "The silence was louder than any noise he had ever heard before.",
  "What happened next would define the rest of their lives.",
];

const tagsPool = [
  "history",
  "tech",
  "crime",
  "life",
  "science",
  "sports",
  "world",
  "news",
];

function randomFrom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTags() {
  const shuffled = [...tagsPool].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
}

export function generatePost(): Post {
  return {
    id: Date.now(),
    title: randomFrom(titles),
    body: randomFrom(bodies),
    tags: randomTags(),
    reactions: {
      likes: Math.floor(Math.random() * 500),
      dislikes: Math.floor(Math.random() * 50),
    },
    views: Math.floor(Math.random() * 5000),
    userId: Math.floor(Math.random() * 100),
  };
}
