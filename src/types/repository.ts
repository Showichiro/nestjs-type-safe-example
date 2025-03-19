import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Result } from '../utils/result';
import { ID, Entity } from './entity';

export type FindById<
  I extends ID,
  Props extends Record<PropertyKey, unknown>,
> = (
  id: I,
) => Promise<
  Result<Entity<I, Props>, NotFoundException | InternalServerErrorException>
>;

export type FindAll<
  I extends ID,
  Props extends Record<PropertyKey, unknown>,
> = () =>
  | Result<Array<Entity<I, Props>>, InternalServerErrorException>
  | Promise<Result<Array<Entity<I, Props>>, InternalServerErrorException>>;

export type Save<I extends ID, Props extends Record<PropertyKey, unknown>> = (
  entity: Props,
) =>
  | Result<Entity<I, Props>, InternalServerErrorException>
  | Promise<Result<Entity<I, Props>, InternalServerErrorException>>;

export type Update<I extends ID, Props extends Record<PropertyKey, unknown>> = (
  id: I,
  entity: Props,
) =>
  | Result<Entity<I, Props>, InternalServerErrorException | NotFoundException>
  | Promise<
      Result<Entity<I, Props>, InternalServerErrorException | NotFoundException>
    >;

export type Delete<I extends ID> = (
  id: I,
) =>
  | Result<void, NotFoundException | InternalServerErrorException>
  | Promise<Result<void, NotFoundException | InternalServerErrorException>>;

export type Repository<E extends Entity<ID, Record<PropertyKey, unknown>>> =
  E extends Entity<infer I, infer Props>
    ? {
        findById: FindById<I, Props>;
        findAll: FindAll<I, Props>;
        save: Save<I, Props>;
        update: Update<I, Props>;
        delete: Delete<I>;
      }
    : never;
