import axios from "axios";
import { PAGE_SIZE } from "./constants";

export async function fetchPostList(page: number) {
  const skip = (page - 1) * PAGE_SIZE;

  const res = await axios.get(
    `https://dummyjson.com/posts?limit=${PAGE_SIZE}&skip=${skip}`,
  );

  return res.data.posts;
}

export async function fetchPostDetails(id: string) {
  const res = await axios.get(`https://dummyjson.com/posts/${id}`);

  return res.data;
}
