import { Body, Controller, HttpCode, Post, HttpException, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorHandling } from 'src/config/error-handling';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { UserLoginDto, UserDto, LoggedUserDto, UpdateUserDto } from './dto/users.dto';
import { HttpResponseDto } from '../config/http-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Put } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @ApiTags('users')
    @ApiOperation({ summary: 'Login with username' })
    @ApiBody({ type: UserLoginDto })
    @ApiResponse({ status: 200, description: 'Successfully logged in', type: LoggedUserDto })
    @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto })
    @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
    @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
    @Post('/login')
    @HttpCode(200)
    async login(@Body() data: UserLoginDto) {
        try {
            if (!data) throw new HttpException({ status: 400, error: "Invalid Body" }, 400);

            return this.authService.login(data.username)

        } catch (error) {
            new ErrorHandling(error);
        }
    }

    @ApiTags('users')
    @ApiOperation({ summary: 'Get User' })
    @ApiBearerAuth('Bearer')
    @ApiResponse({ status: 200, description: 'Get User Information', type: UserDto })
    @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto })
    @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
    @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(200)
    async user(@Req() { user }) {
        try {
            return this.usersService.user({
                userId: user.id
            })
        } catch (error) {
            new ErrorHandling(error);
        }
    }

    @ApiTags('users')
    @ApiOperation({ summary: 'Update User' })
    @ApiBearerAuth('Bearer')
    @ApiResponse({ status: 200, description: 'Get User Information', type: UserDto })
    @ApiResponse({ status: 400, description: 'Bad Request', type: HttpResponseDto })
    @ApiResponse({ status: 403, description: 'Forbidden', type: HttpResponseDto })
    @ApiResponse({ status: 500, description: "Internal Server Error", type: HttpResponseDto })
    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(200)
    async update(@Req() { user }, @Body() updateData: UpdateUserDto) {
        try {
            this.usersService.upsertWork(user.id, updateData)
        } catch (error) {
            new ErrorHandling(error);
        }
    }
}
