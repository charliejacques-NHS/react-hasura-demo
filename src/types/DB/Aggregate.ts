export interface Aggregate<T extends object> {
  aggregate: {
    count: number;
    sum: T;
  };
}
