import { ApiProperty } from "@nestjs/swagger";
import { Work } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    username: string;
}

export class UpdateUserDto {
    @ApiProperty({required: false})
    startTime?: Date;

    @ApiProperty({required: false})
    endTime?: Date;

    @ApiProperty({required: false})
    id?: string;
}

export class LoggedUserDto {
    
    @ApiProperty({required: true})
    @IsNotEmpty()
    token: string;

}

export class UserDto {

    @ApiProperty({required: true})
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    Work: Work;
}