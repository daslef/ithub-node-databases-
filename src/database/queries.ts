import type { Database } from "sqlite3";
import type { DriverCallback } from "./types";

function getTopFiveCountries(db: Database, cb: DriverCallback) {
	db.all(
		`select
    AnswerText as LiveCountry,
    count(*) as Quantity
    from Answer
    where SurveyId = 2019 and QuestionID = 3
    group by LiveCountry
    order by Quantity desc
    limit 5`,
		(error, rows) => {
			if (error) {
				throw error;
			}
			cb(rows);
		},
	);
}

function getPercentWithMentalDiseases(db: Database, cb: DriverCallback) {
	db.all(
		`select
      (select
        count(*) as Quantity
        from Answer
        where AnswerText = "Yes" and QuestionID = 33 and SurveyID = 2019
      ) * 100 / count(*) as Percent
      from Answer
      where QuestionID = 33 and SurveyID = 2019;`,
		(error, rows) => {
			if (error) {
				throw error;
			}
			cb(rows);
		},
	);
}

export { getTopFiveCountries, getPercentWithMentalDiseases };
