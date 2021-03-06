import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import type { User } from '../../users/entities';

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh',
  ResetPassword = 'reset_password',
}

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('User')
  @JoinColumn({
    name: 'user_id',
  })
  public user: User;

  @RelationId('user')
  public userId: string;

  @Column()
  public token: string;

  @Column()
  public type: TokenType;
}
