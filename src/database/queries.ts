import type getConnection from "./connection";
// import type { DatabaseSchema } from "./types";

type Connection = ReturnType<typeof getConnection>;

async function getPhysicalAndMental(connection: Connection) {
	try {
		const result = await connection
			.selectFrom("Answer")
			.select(["Answer.AnswerText as PhysicalHealth"])
			.innerJoin(
				(eb) =>
					eb
						.selectFrom("Answer")
						.select(["Answer.UserID", "Answer.AnswerText"])
						.where("Answer.QuestionID", "=", 65)
						.as("Mental"),
				(join) => join.onRef("Answer.UserID", "=", "Mental.UserID"),
			)
			.where("Answer.SurveyID", "=", 2019)
			.where("Answer.QuestionID", "=", 64)
			.execute();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function getMostFrequentWords(connection: Connection) {
	return await connection
		.selectFrom("Answer")
		.select("AnswerText as Notes")
		.where("QuestionID", "=", 103)
		.where("AnswerText", "!=", "-1")
		.execute();
}

export { getPhysicalAndMental, getMostFrequentWords };
