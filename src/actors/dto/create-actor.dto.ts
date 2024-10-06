import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateActorDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: "Actor's firstname"})
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: "Actor's lastname"})
    lastName: string;
}
