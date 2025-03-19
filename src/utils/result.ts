export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(val: T): Ok<T> => {
  return {
    ok: true,
    value: val,
  };
};

export const err = <E extends Error>(err: E): Err<E> => {
  return {
    ok: false,
    error: err,
  };
};
