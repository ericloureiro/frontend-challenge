import { Post } from "@/types";

import reducer, {
  addNewPost,
  clearScrollPosition,
  loadPostById,
  loadPostsByPage,
  removeNewPost,
  setScrollPosition,
} from "./postsSlice";
import { POSTS_SLICE_INITIAL_STATE, REQUEST_ERROR_MESSAGE } from "./constants";
import { PostsSliceState } from "./types";

const mockScrollPosition = 200;

const mockPost = (id: string): Post => ({
  id,
  title: `Post ${id}`,
  body: "Body",
  tags: [],
  reactions: { likes: 0, dislikes: 0 },
  views: 0,
  userId: 1,
});

describe("postsSlice", () => {
  let initialState: PostsSliceState;

  beforeEach(() => {
    initialState = JSON.parse(JSON.stringify(POSTS_SLICE_INITIAL_STATE));
  });

  describe("reducers", () => {
    describe("scroll", () => {
      test("should set scroll position", () => {
        const { feed } = reducer(
          initialState,
          setScrollPosition(mockScrollPosition),
        );

        expect(feed.scrollPosition).toBe(mockScrollPosition);
      });

      test("should clear scroll position", () => {
        initialState.feed.scrollPosition = mockScrollPosition;

        const { feed } = reducer(initialState, clearScrollPosition());
        expect(feed.scrollPosition).toBe(0);
      });
    });

    describe("new posts", () => {
      test("should prepend new post", () => {
        const stateWithPosts = {
          ...initialState,
          allPosts: [mockPost("1"), mockPost("2")],
        };

        const newPost = mockPost("3");

        const { allPosts } = reducer(stateWithPosts, addNewPost(newPost));

        expect(allPosts[0].id).toBe("3");
      });

      test("should add post id to newPostIds", () => {
        const newPost = mockPost("1");

        const { newPostIds } = reducer(initialState, addNewPost(newPost));

        expect(newPostIds).toContain("1");
      });

      test("should add duplicate post - testing purpose for mocking new ws responses", () => {
        const existingPost = mockPost("1");

        const stateWithPosts = {
          ...initialState,
          allPosts: [existingPost],
        };

        const { allPosts, newPostIds } = reducer(
          stateWithPosts,
          addNewPost(existingPost),
        );

        expect(allPosts.length).toBe(2);
        expect(newPostIds.length).toBe(1);
      });

      test("should remove post from newPostIds", () => {
        const stateWithIds = {
          ...initialState,
          newPostIds: ["1", "2", "3"],
        };

        const { newPostIds } = reducer(stateWithIds, removeNewPost("2"));

        expect(newPostIds).toEqual(["1", "3"]);
      });
    });
  });

  describe("loadPostById", () => {
    test("should set loading true on pending", () => {
      const { details } = reducer(initialState, {
        type: loadPostById.pending.type,
      });

      expect(details.loading).toBe(true);
    });

    test("should store post on fulfilled", () => {
      const post = mockPost("1");

      const { details, postById } = reducer(initialState, {
        type: loadPostById.fulfilled.type,
        payload: post,
      });

      expect(postById[1]).toEqual(post);
      expect(details.loading).toBe(false);
      expect(details.error).toBeNull();
    });

    test("should set error on rejected", () => {
      const { details } = reducer(initialState, {
        type: loadPostById.rejected.type,
      });

      expect(details.error).toBe(REQUEST_ERROR_MESSAGE);
      expect(details.loading).toBe(false);
    });
  });

  describe("loadPostsByPage", () => {
    test("should set initial loading when no posts", () => {
      const { feed } = reducer(initialState, {
        type: loadPostsByPage.pending.type,
      });

      expect(feed.loading.initial).toBe(true);
      expect(feed.loading.more).toBe(false);
    });

    test("should set loading.more when posts already exist", () => {
      const stateWithPosts = {
        ...initialState,
        allPosts: [mockPost("1")],
      };

      const { feed } = reducer(stateWithPosts, {
        type: loadPostsByPage.pending.type,
      });

      expect(feed.loading.more).toBe(true);
    });

    test("should append new posts", () => {
      const stateWithPosts = {
        ...initialState,
        allPosts: [mockPost("1")],
      };

      const { allPosts } = reducer(stateWithPosts, {
        type: loadPostsByPage.fulfilled.type,
        payload: [mockPost("2")],
      });

      expect(allPosts.map((post) => post.id)).toEqual(["1", "2"]);
    });

    test("should NOT duplicate posts", () => {
      const stateWithPosts = {
        ...initialState,
        allPosts: [mockPost("1")],
      };

      const { allPosts } = reducer(stateWithPosts, {
        type: loadPostsByPage.fulfilled.type,
        payload: [mockPost("1"), mockPost("2")],
      });

      expect(allPosts.map((post) => post.id)).toEqual(["1", "2"]);
    });

    test("should increment page", () => {
      const { feed } = reducer(initialState, {
        type: loadPostsByPage.fulfilled.type,
        payload: [],
      });

      expect(feed.page).toBe(POSTS_SLICE_INITIAL_STATE.feed.page + 1);
    });

    test("should reset loading and error on fulfilled", () => {
      const { feed } = reducer(initialState, {
        type: loadPostsByPage.fulfilled.type,
        payload: [],
      });

      expect(feed.loading.initial).toBe(false);
      expect(feed.loading.more).toBe(false);
      expect(feed.error).toBeNull();
    });

    test("should set error on rejected", () => {
      const { feed } = reducer(initialState, {
        type: loadPostsByPage.rejected.type,
      });

      expect(feed.error).toBe(REQUEST_ERROR_MESSAGE);
      expect(feed.loading.initial).toBe(false);
      expect(feed.loading.more).toBe(false);
    });
  });

  describe("integration", () => {
    test("should handle initial load and pagination", () => {
      let state = reducer(initialState, {
        type: loadPostsByPage.pending.type,
      });

      state = reducer(state, {
        type: loadPostsByPage.fulfilled.type,
        payload: [mockPost("1"), mockPost("2")],
      });

      state = reducer(state, {
        type: loadPostsByPage.pending.type,
      });

      state = reducer(state, {
        type: loadPostsByPage.fulfilled.type,
        payload: [mockPost("3")],
      });

      expect(state.allPosts.map((p) => p.id)).toEqual(["1", "2", "3"]);
      expect(state.feed.page).toBe(POSTS_SLICE_INITIAL_STATE.feed.page + 2);
    });

    test("should handle real-time update + pagination without duplicates", () => {
      let state = {
        ...initialState,
        allPosts: [mockPost("1"), mockPost("2")],
      };

      state = reducer(state, addNewPost(mockPost("3")));

      state = reducer(state, {
        type: loadPostsByPage.fulfilled.type,
        payload: [mockPost("2"), mockPost("4")],
      });

      expect(state.allPosts.map((p) => p.id)).toEqual(["3", "1", "2", "4"]);
    });
  });
});
