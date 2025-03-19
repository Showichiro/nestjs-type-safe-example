export type ID = string | number;

export type Entity<I extends ID, T extends Record<PropertyKey, unknown>> = {
  id: I;
} & T;
