export interface Aggregate<T = object> {
  aggregate: {
    count: number;
    sum: T;
  };
}
