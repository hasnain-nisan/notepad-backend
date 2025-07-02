import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
