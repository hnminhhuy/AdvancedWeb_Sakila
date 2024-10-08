import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FilmActor } from "./FilmActor";
import { Film } from "./Film";

@Index("actor_pkey", ["actorId"], { unique: true })
@Entity("actor", { schema: "public" })
export class Actor {
  @PrimaryGeneratedColumn({ type: "integer", name: "actor_id" })
  actorId: number;

  @Column("character varying", { name: "first_name", length: 45 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 45 })
  lastName: string;

  @OneToMany(() => FilmActor, (filmActor) => filmActor.actor)
  filmActors: FilmActor[];

  // @ManyToMany(() => Film, (film) => (film.actors))
  // films: Film[];

}
