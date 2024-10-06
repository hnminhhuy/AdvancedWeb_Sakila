import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/database/entities/Actor';
import { Repository } from 'typeorm';

@Injectable()
export class ActorsService {

  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>
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

  async remove(id: number): Promise<{ message: string }> {
    const res = await this.actorsRepository.delete(id);
  
    if (res.affected === 0) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
  
    return { message: `Actor with ID ${id} successfully removed` };
  }
  
}
