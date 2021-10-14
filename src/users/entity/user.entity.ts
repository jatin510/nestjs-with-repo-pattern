import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const email = {
  address: { type: String },
  verified: { type: Boolean, default: false },
};

const services = {
  password: { bcrypt: { type: String } },
};

export type UserDocument = User & Document;
interface IService {
  password: { bcrypt: string };
}
interface IEmail {
  address: string;
  verified: boolean;
}

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  username: string;

  @Prop({ default: 'user' })
  type: string;

  @Prop({ default: 5.5 })
  utcOffset: number;

  @Prop(raw({ type: email, required: false }))
  emails: IEmail[];

  @Prop(raw({ type: services, required: false }))
  services: IService;

  @Prop()
  __rooms: string[];

  get password() {
    return this.services.password.bcrypt;
  }

  set password(password: string) {
    if (!this.services) {
      this.services = { password: { bcrypt: password } };
      return;
    }
    this.services.password.bcrypt = password;
  }

  get email() {
    return this.emails?.[0].address;
  }

  set email(e: string) {
    this.emails = [{ address: e, verified: false }];
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
