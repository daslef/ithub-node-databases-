import getConnection from "./database/connection";
import { logAllQuestions, createSurvey } from "./database/queries";

export async function main() {
	try {
		const connection = getConnection();
		await logAllQuestions(connection);
		await createSurvey(connection, { Description: "Insertable Test" });
	} catch (error) {
		console.error("Failed to start:", error);
		process.exit(1);
	}
}

await main();
