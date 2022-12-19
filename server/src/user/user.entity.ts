import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserLogons } from '../auth/auth.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 'USER' })
  role: string;

  @OneToMany(() => UserLogons, (userLogons) => userLogons.id)
  userLogons: UserLogons[];
}
