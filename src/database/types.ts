import { Selectable, Updateable } from 'kysely'
import { Database } from "sqlite3";

type SurveyID = 2014 | 2016 | 2017 | 2018 | 2019

interface DatabaseSchema {
  Answer: AnswerSchema;
  Question: QuestionSchema;
  Survey: SurveySchema;
}

interface SurveySchema {
  SurveyID: SurveyID;
  Description: string;
}

interface QuestionSchema {
  questionid: number;
  questiontext: string;
}

interface AnswerSchema {
  AnswerText: string;
  SurveyID: SurveySchema["SurveyID"]
  QuestionID: QuestionSchema["questionid"]
  UserID: number;
}

// interface UpdateAnswer {
//   connection: Database;
//   userId: number;
//   questionId: number;
//   surveyId: SurveyID;
//   updatedAnswer: string;
// }

interface MostFrequentQuestions {
  connection: Database;
  quantity?: number;
  cb: (rows: unknown[]) => void
}

export type Question = Selectable<QuestionSchema>
export type UpdateAnswer = Updateable<AnswerSchema>
export type { MostFrequentQuestions, DatabaseSchema }
