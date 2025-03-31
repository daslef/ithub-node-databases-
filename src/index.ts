import getDbConnection from "./database/connection";
import { getTopFiveCountries } from "./database/queries";

export async function main() {
	try {
		const db = getDbConnection();
		getTopFiveCountries(db, (rows) => {
			console.log(rows);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
