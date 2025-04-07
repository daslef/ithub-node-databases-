import getConnection from "./kysely/connection";
import { addAuthor } from "./prisma/authors-add";

export async function main() {
  try {
    // const connection = getConnection();
    const newAuthor = await addAuthor('pretty-penguin')
    console.log(newAuthor);
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
}

await main();
