import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const result = await this.userService.findById(Number(id));
    if (result.ok) {
      return result.value;
    } else {
      throw result.error;
    }
  }
}
