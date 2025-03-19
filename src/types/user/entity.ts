import { Entity } from '../entity';
import { User as PrismaUser } from '@prisma/client';

type UserProps = PrismaUser;

export type UserEntity = Entity<number, UserProps>;
