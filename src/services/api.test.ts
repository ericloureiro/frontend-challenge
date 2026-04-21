import axios from "axios";
import { fetchPostList, fetchPostDetails } from "./api";
import { PAGE_SIZE } from "./constants";

jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("api service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchPostList", () => {
    test("should call correct URL with page 1", async () => {
      mockAxios.get.mockResolvedValue({
        data: { posts: [{ id: 1 }] },
      });

      await fetchPostList(1);

      expect(mockAxios.get).toHaveBeenCalledWith(
        `https://dummyjson.com/posts?limit=${PAGE_SIZE}&skip=0`,
      );
    });

    test("should calculate skip correctly for page > 1", async () => {
      mockAxios.get.mockResolvedValue({
        data: { posts: [] },
      });

      await fetchPostList(3);

      const expectedSkip = (3 - 1) * PAGE_SIZE;

      expect(mockAxios.get).toHaveBeenCalledWith(
        `https://dummyjson.com/posts?limit=${PAGE_SIZE}&skip=${expectedSkip}`,
      );
    });

    test("should return posts array", async () => {
      const mockPosts = [{ id: 1 }, { id: 2 }];

      mockAxios.get.mockResolvedValue({
        data: { posts: mockPosts },
      });

      const result = await fetchPostList(1);

      expect(result).toEqual(mockPosts);
    });
  });

  describe("fetchPostDetails", () => {
    test("should call correct URL with id", async () => {
      mockAxios.get.mockResolvedValue({
        data: { id: 1, title: "test" },
      });

      await fetchPostDetails("1");

      expect(mockAxios.get).toHaveBeenCalledWith(
        "https://dummyjson.com/posts/1",
      );
    });

    test("should return post details", async () => {
      const mockPost = { id: 1, title: "hello" };

      mockAxios.get.mockResolvedValue({
        data: mockPost,
      });

      const result = await fetchPostDetails("1");

      expect(result).toEqual(mockPost);
    });
  });
});
