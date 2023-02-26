import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Work } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
import { format, formatDuration, intervalToDuration } from 'date-fns';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService) { }

    async user(
        params: {
            userId?: string,
            username?: string,
        }
    ) {
        let { userId, username } = params;
        let user = await this.prisma.users.findUnique({
            where: {
                ...{ ...userId && { id: userId } },
                ...{ ...username && { username: username } }
            },
            include: {
                work: {
                    orderBy: {
                        startTime: 'desc'
                    },
                    take: 10
                }
            }
        });
        let work = user.work.map(x => {
            return {
                date: format(x.startTime, 'dd-MM-yyyy'),
                diffTime: formatDuration(intervalToDuration({
                    start: x.startTime,
                    end: x.endTime ?? new Date()
                }), {
                    format: ['hours', 'minutes']
                }).replace(' hours', 'h').replace(' minutes', "m"),
                ...x
            }
        })
        return { username: user.username, work }
    }

    async upsertWork(userId: string, updateData: UpdateUserDto): Promise<Work> {
        let { endTime, startTime, id } = updateData;
        return await this.prisma.work.upsert({
            create: {
                startTime,
                userId,
            },
            update: {
                ...{ ...endTime && { endTime } }
            },
            where: {
                id
            }
        })
    }
}
