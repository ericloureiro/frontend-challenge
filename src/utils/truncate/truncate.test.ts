import { truncate } from "./truncate";

describe("truncate", () => {
  describe("should return original text when", () => {
    test("under limit", () => {
      const text = "Hello world";

      const result = truncate(text, 100);

      expect(result).toBe(text);
    });

    test("exactly at limit", () => {
      const text = "a".repeat(100);

      const result = truncate(text, 100);

      expect(result).toBe(text);
    });
  });

  describe("should truncate text and add ellipsis", () => {
    test("over default limit", () => {
      const text = "a".repeat(150);

      const result = truncate(text, 100);

      expect(result).toBe("a".repeat(100) + "...");
    });

    test("over custom limit", () => {
      const text = "abcdefghijklmnopqrstuvwxyz";

      const result = truncate(text, 10);

      expect(result).toBe("abcdefghij...");
    });
  });
});
