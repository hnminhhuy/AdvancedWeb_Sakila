import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from 'src/database/entities/Actor';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('actors')
@Controller('api/actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @ApiOperation({summary: 'Create a new actor'})
  @ApiBody({type: CreateActorDto})
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all actors'})
  async findAll(): Promise<Actor[]> {
    return await this.actorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Get a specific actor by id"})
  async findOne(@Param('id') id: string): Promise<Actor> {
    return await this.actorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({type: UpdateActorDto})
  @ApiOperation({summary: 'Update an exisiting actor by id'})
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(+id, updateActorDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete an actor by id'})
  remove(@Param('id') id: string) {
    return this.actorsService.remove(+id);
  }
}
