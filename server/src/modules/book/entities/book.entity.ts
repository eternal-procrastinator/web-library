import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "@/modules/auth/entities/user.entity";

@ObjectType()
@Entity()
export class Book {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  author!: string;

  @Field()
  @Column()
  year!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coverImage?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.books, { onDelete: "CASCADE" })
  user!: User;
}
