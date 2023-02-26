import { PrismaClient } from '@prisma/client'
import { addHours } from 'date-fns'
const prisma = new PrismaClient()
async function main() {
    const user1 = await prisma.users.upsert({
        where: { username: '4SXXFMF' },
        update: {},
        create: {
            username: '4SXXFMF',
            work: {
                createMany: {
                    data: [
                        {
                            startTime: new Date("2023-01-17T03:24:00"),
                            endTime: addHours(new Date("2023-01-17T03:24:00"), 6),
                        },
                        {
                            startTime: new Date("2023-01-18T03:24:00"),
                            endTime: addHours(new Date("2023-01-18T03:24:00"), 7),
                        },
                        {
                            startTime: new Date("2023-01-19T03:24:00"),
                            endTime: addHours(new Date("2023-01-19T03:24:00"), 8),
                        },
                        {
                            startTime: new Date("2023-01-20T03:24:00"),
                            endTime: addHours(new Date("2023-01-20T03:24:00"), 9),
                        },
                    ]
                }
            }
        },
    })
    const user2 = await prisma.users.upsert({
        where: { username: '4STTFMF' },
        update: {},
        create: {
            username: '4STTFMF',
            work: {
                createMany: {
                    data: [
                        {
                            startTime: new Date("2023-01-17T03:24:00"),
                            endTime: addHours(new Date("2023-01-17T03:24:00"), 6),
                        },
                        {
                            startTime: new Date("2023-01-18T03:24:00"),
                            endTime: addHours(new Date("2023-01-18T03:24:00"), 7),
                        },
                        {
                            startTime: new Date("2023-01-19T03:24:00"),
                            endTime: addHours(new Date("2023-01-19T03:24:00"), 8),
                        },
                        {
                            startTime: new Date("2023-01-20T03:24:00"),
                            endTime: addHours(new Date("2023-01-20T03:24:00"), 9),
                        },
                    ]
                }
            }
        },
    })
    console.log({ user1, user2 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })