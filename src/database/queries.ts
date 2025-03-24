import type { UpdateAnswer, MostFrequentQuestions } from "./types"
import type getConnection from "./connection"

async function logAllQuestions(connection: ReturnType<typeof getConnection>) {
  try {
    const result = await connection.selectFrom("Question").selectAll().execute()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

export { logAllQuestions }
