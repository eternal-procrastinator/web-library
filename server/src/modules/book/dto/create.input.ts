import { IsNotEmptyString } from "@/modules/common/validators/is-not-empty-string.validator";
import { InputType, Field, Int } from "@nestjs/graphql";
import { MinLength, MaxLength, IsInt, Min, Max, IsOptional } from "class-validator";

@InputType()
export class CreateBookInput {
  @Field(() => String)
  @MinLength(2, { message: "The title must contain a minimum of 2 characters" })
  @MaxLength(100, { message: "The title should not exceed 100 characters" })
  @IsNotEmptyString()
  title!: string;
  
  @Field(() => String)
  @MinLength(2, { message: "The author must contain a minimum of 2 characters" })
  @IsNotEmptyString()
  author!: string;
  
  @Field(() => Int)
  @IsInt({ message: "The year must be a whole number" })
  @Min(0, { message: "The year can't be negative" })
  @Max(new Date().getFullYear(), { message: "The year cannot be longer than the current year" })
  year!: number;
  
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmptyString()
  genre?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmptyString()
  description?: string;
  
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmptyString()
  coverImage?: string;
}
