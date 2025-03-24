import type { Selectable, Updateable } from 'kysely'

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

export type Question = Selectable<QuestionSchema>
export type UpdateAnswer = Updateable<AnswerSchema>
export type { DatabaseSchema }
