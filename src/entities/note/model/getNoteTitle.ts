export function getNoteTitle(content: string, maxLen = 40): string {
  const lines = content.split("\n").map((l) => l.trim());
  const first = lines.find((l) => l.length > 0) ?? "";
  const title = first.length > 0 ? first : "Untitled";
  return title.length > maxLen ? `${title.slice(0, maxLen)}…` : title;
}
