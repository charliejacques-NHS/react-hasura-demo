type Filters =
  | '_like'
  | '_ilike'
  | '_eq'
  | '_neq'
  | '_gt'
  | '_lt'
  | '_gte'
  | '_lte';

type ArrayFilters = '_in' | '_nin';

type HasuraFilter<T extends Primitive> = {
  [K in Filters]?: T;
} & { [K in ArrayFilters]?: T[] };

type HasuraOrderBy<T extends Primitive> = {
  [K in Filters]?:
    | 'asc'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc'
    | 'desc_nulls_last'
    | 'desc_nulls_first';
} & { [K in ArrayFilters]?: T[] };

type Primitive = string | boolean | number;

export type QueryFilter<T> = {
  [K in keyof Partial<T>]: T[K] extends Primitive
    ? HasuraFilter<T[K]>
    : QueryFilter<T[K]>;
};

export type QueryOrderBy<T> = {
  [K in keyof Partial<T>]: T[K] extends Primitive
    ? HasuraOrderBy<T[K]>
    : QueryOrderBy<T[K]>;
};
