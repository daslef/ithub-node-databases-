import getConnection from "./database/connection";
import { getPhysicalAndMental, getMostFrequentWords } from "./database/queries";

export async function main() {
	try {
		const connection = getConnection();
		// const results = await getPhysicalAndMental(connection);
		const results = await getMostFrequentWords(connection);
		console.log(results);
	} catch (error) {
		console.error("Failed to start:", error);
		process.exit(1);
	}
}

await main();
