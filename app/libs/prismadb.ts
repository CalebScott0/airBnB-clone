// import { PrismaClient } from "@prisma/client";

// // global definition of prisma variable
// declare global {
//     var prisma: PrismaClient | undefined
// }

// // this will limit the amount of possible connections open, avoiding potential problems with nextjs reload
// // client searches for globalThis.prisma or creates new client
// const client = globalThis.prisma || new PrismaClient()
// // if enviro is not in production, globalThis.prisma is set to the client
// if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

// export default client;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
