import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { Users } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  async login(username: string) {
    let user = await this.prisma.users.findUnique({
      where: {
        username
      }
    })
    if (!user) throw new HttpException('User not found', 404)
    
    return {
      token: await this.generateToken(user)
    }
  }

  async generateToken(user: Users) {
    const payload = { username: user.username, id: user.id };
    return this.jwtService.sign(payload)
  }
}