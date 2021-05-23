import { Body, Injectable, Param } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async getAllUsers() {
    return await this.userRepository.findAll()
  }

  async getUser(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async updateUser(dto: UpdateUserDto, id: string) {
    return await this.userRepository.update(dto, {where: { id }})
  }

  async deleteUser(id: string) {
    return this.userRepository.destroy({where: { id }});
  }
}
