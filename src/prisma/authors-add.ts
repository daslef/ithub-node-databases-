import { PrismaClient } from "@prisma/client";

export async function addAuthor(name: string) {
  const prismaClient = new PrismaClient()
  try {
    return await prismaClient.author.create({
      data: {
        name
      }
    })
  } catch (error) {
    console.error(error)
  }
}
