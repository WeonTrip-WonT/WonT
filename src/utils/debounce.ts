export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number = 3000,
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
