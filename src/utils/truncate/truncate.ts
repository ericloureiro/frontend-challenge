export function truncate(text: string, limit = 100) {
  if (text.length <= limit) {
    return text;
  }

  return text.slice(0, limit) + "...";
}
