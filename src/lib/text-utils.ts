export function splitWords(text: string) {
  return text.split(/(\s+|_+)/).map((part) => part);
}
