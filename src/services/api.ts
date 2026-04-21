import axios from "axios";
import { PAGE_SIZE } from "./constants";

export async function fetchPosts(page: number) {
  const limit = 20;
  const skip = (page - 1) * limit;

  const res = await axios.get(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
  );

  return res.data.posts;
}
