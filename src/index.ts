import getDbConnection from "./database/connection";
import { logAllQuestions } from "./database/queries";

export async function main() {
  try {
    const connection = getDbConnection()
    await logAllQuestions(connection)
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
}

await main();
