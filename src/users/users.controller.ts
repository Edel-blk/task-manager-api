import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from 'src/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @Post('sign-up')
  createUser(@Body() newUser: CreateUserDTO) {
    return this.userService.createUser(newUser);
  }

  @Post('login')
  searchUser(@Body() user: LoginUserDTO) {
    console.log(user);
    return this.userService.searchUser(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedFields: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(id, updatedFields);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
