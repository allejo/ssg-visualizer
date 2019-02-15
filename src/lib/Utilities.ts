/**
 * @see https://stackoverflow.com/a/8084248
 */
export function randomID() {
  return Math.random().toString(36).substr(2, 5);
}
