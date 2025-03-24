import getDbConnection from "./database/connection";
import { logTopFiveCountries } from "./database/queries";

export async function main() {
	try {
		const db = getDbConnection();
		logTopFiveCountries(db);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
