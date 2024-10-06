import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/database/entities/Actor';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ActorsService {

  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const actor = this.actorsRepository.create(createActorDto);
    return await this.actorsRepository.save(actor);
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorsRepository.find();
  }

  async findOne(id: number): Promise<Actor> {
    const res = await this.actorsRepository.findOneBy({actorId: id});
    if(!res) {
      throw new NotFoundException();
    }

    return res;
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    const updateInstance = await this.actorsRepository.findOneBy({actorId: id});
    if (!updateInstance) {
      throw new NotFoundException();
    }

    updateInstance.firstName = updateActorDto.firstName ?? updateInstance.firstName;
    updateInstance.lastName = updateActorDto.lastName ?? updateActorDto.lastName;

    return await this.actorsRepository.save(updateInstance);
  }

  async remove(id: number) {
    const actor = this.actorsRepository.findOneBy({actorId: id});

    if (!actor) {
      throw new NotFoundException();
    }

    await this.entityManager.delete('film_actor', {actorId: id});

    try {
      const res = await this.actorsRepository.delete({actorId: id});
      if (res.affected == 1) {
        return { message: "Delete successfully" };
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  
}
