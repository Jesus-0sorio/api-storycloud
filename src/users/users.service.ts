import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async findOne(_id: string) {
    try {
      const userExist = await this.userModel.findOne({ _id }).exec();
      if (!userExist) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return userExist;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(_id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userModel.updateOne({ _id }, updateUserDto).exec();
      return 'User updated successfully';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
