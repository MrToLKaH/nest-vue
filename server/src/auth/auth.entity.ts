import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserLogons {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @Column({ nullable: false })
  userAgent: string;

  @Column({ nullable: false })
  refreshToken: string;
}
