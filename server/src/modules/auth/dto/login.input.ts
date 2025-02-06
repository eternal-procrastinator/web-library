import { IsNotEmptyString } from "@/modules/common/validators/is-not-empty-string.validator";
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmptyString()
  password!: string;
}
