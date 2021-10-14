import { IsString, IsEmail } from 'class-validator';

export class UserDomain {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phone: string;
}
