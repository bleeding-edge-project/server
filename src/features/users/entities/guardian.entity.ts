import { ChildEntity, OneToMany } from 'typeorm';
import { Role, User } from './user.entity';
import type { Student } from './student.entity';

@ChildEntity(Role.Guardian)
export class Guardian extends User {
  @OneToMany('Student', 'guardian')
  public students: Student[];
}
