export function generateOptionFromArray(arr: any[]) {
  return arr.map((it) => ({
    label: it,
    value: it,
  }));
}
