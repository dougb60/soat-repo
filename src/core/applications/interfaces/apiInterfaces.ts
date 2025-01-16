export interface ReturnType<T> {
  response: T;
  status: 200 | 500 | 404;
}
