import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Repository } from 'src/types/repository';
import { UserEntity } from 'src/types/user/entity';
import { err, ok } from 'src/utils/result';

@Injectable()
export class UserService implements Repository<UserEntity> {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number) {
    try {
      const result = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (result == null) {
        return err(new NotFoundException());
      }
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(e));
    }
  }

  async findAll() {
    try {
      const result = await this.prismaService.user.findMany();
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(e));
    }
  }

  async save(entity: UserEntity) {
    try {
      const result = await this.prismaService.user.create({ data: entity });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(e));
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: UserEntity['id'], entity: UserEntity) {
    return err(new NotImplementedException());
  }

  async delete(id: UserEntity['id']) {
    try {
      await this.prismaService.user.delete({ where: { id } });
      return ok(undefined);
    } catch (e) {
      return err(e);
    }
  }
}
