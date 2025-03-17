import type {
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  Question: QuestionTable
  Survey: SurveyTable
  Answer: AnswerTable
}

export interface QuestionTable {
  questionid: Generated<number>
  questiontext: string
}

export interface SurveyTable {
  SurveyID: Generated<number>
  Description: string
}

export interface AnswerTable {
  UserID: Generated<number>
  QuestionID: number
  SurveyID: number
  AnswerText: string
}

export type Question = Selectable<QuestionTable>
export type NewQuestion = Insertable<QuestionTable>
export type QuestionUpdate = Updateable<QuestionTable>

export type Survey = Selectable<SurveyTable>
export type NewSurvey = Insertable<SurveyTable>
export type SurveyUpdate = Updateable<SurveyTable>

export type Answer = Selectable<AnswerTable>
export type NewAnswer = Insertable<AnswerTable>
export type AnswerUpdate = Updateable<AnswerTable>
