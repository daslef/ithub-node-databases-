import type { Database } from "sqlite3";

function logFirstFourtyAnswers(db: Database) {
	db.each("select * from answer limit 40", (error, row) => {
		if (!error) {
			console.log(row);
		}
	});
}

export { logFirstFourtyAnswers };
