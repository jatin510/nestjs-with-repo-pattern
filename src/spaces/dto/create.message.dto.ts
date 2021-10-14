import { IsString, IsEmail } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly message: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly roomId: string;

  @IsEmail()
  readonly username: string;
}
