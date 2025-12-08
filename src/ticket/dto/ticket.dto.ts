import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class TicketDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    boardId: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    assignedToId?: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    statusId: number;
}
