import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Other user-related endpoints can be added here
}
