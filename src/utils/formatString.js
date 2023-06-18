export function shortenString(str, length=20) {
  if (str.length > length) {
    return `${str.slice(0, length)}...`;
  }
  return str;
}