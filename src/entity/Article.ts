import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    public id: number = 0;

    @Column()
    public title: string = '';
}
