import type { Insertable } from "kysely";
import type getConnection from "./connection";
import type { DB } from "kysely-codegen";

type Connection = ReturnType<typeof getConnection>;

async function logAllQuestions(connection: Connection) {
	try {
		const result = await connection.selectFrom("Question").selectAll().execute();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function createSurvey(connection: Connection, newSurvey: Insertable<DB["Survey"]>) {
	try {
		await connection
			.insertInto("Survey")
			.values(newSurvey)
			.returningAll()
			.executeTakeFirstOrThrow();
	} catch (error) {
		console.error(error);
	}
}

export { logAllQuestions, createSurvey };
