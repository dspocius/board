import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    return (await this.userRepository.findBy({email: email }));
  }
  async register(email: string,password: string): Promise<User> {
    const usr = new User();
    usr.email = email;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    usr.password = hash;
    return this.userRepository.save(usr);
  }
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
