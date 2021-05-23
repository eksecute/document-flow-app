import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('/users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post('/')
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Put('/:id')
  updateUser(@Body() dto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(dto, id);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
