import { IsEmail, IsString } from "class-validator";


export class CreateContactDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;
}