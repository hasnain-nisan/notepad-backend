import { User } from '../../users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User | null>;
  login(loginDto: LoginDto): Promise<{ access_token: string; user: User }>;
  register(registerDto: RegisterDto): Promise<{ user: User }>;
}
