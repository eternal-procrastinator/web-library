import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";

import { Book } from "@/modules/book/entities/book.entity";

@ObjectType()
@Entity()
@Unique(["email"])
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Field()
  @Column({ unique: true })
  email!: string;
  
  @Field()
  @Column()
  password!: string;

  @OneToMany(() => Book, (book) => book.user, { cascade: true })
  books?: Book[];
}
