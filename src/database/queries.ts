import type { Database } from "sqlite3";

function logTopFiveCountries(db: Database) {
	db.each(
		"select country, count(*) as count from Answer limit 5 order by count desc",
		(error, row) => {
			if (!error) {
				console.log(row);
			}
		},
	);
}

export { logTopFiveCountries };
