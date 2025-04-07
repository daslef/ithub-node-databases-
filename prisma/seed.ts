import { PrismaClient } from "@prisma/client";
import authors from './authors.json'
import files from './files.json'

async function seedAuthors(prismaClient: PrismaClient) {
  await prismaClient.author.deleteMany()
  await prismaClient.author.createMany({
    data: authors.map(author => ({
      name: author.name,
      created_at: new Date(author.created_at).toISOString(),
      modified_at: new Date(author.modified_at).toISOString(),
    }))
  })
}

async function seedFiles(prismaClient: PrismaClient) {
  await prismaClient.file.deleteMany()
  await prismaClient.file.createMany({
    data: files.map(({ id, author_id, created_at, modified_at, ...other }) => ({
      ...other,
      author_id,
      created_at: new Date(created_at).toISOString(),
      modified_at: new Date(modified_at).toISOString(),
    }))
  })
}

async function main() {
  const prisma = new PrismaClient()
  try {
    await seedAuthors(prisma)
  } catch (error) {
    console.error(error)
  }

  try {
    await seedFiles(prisma)
  } catch (error) {
    console.error(error)
  }
}

main()
