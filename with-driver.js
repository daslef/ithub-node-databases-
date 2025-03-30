import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const db = await open({
    filename: path.join(__dirname, 'mental_health.sqlite'),
    driver: sqlite3.Database
  });

  try {
    //вопрос ID 3
    console.log('\n=== Топ-5 стран респондентов ===');
    const topCountries = await db.all(`
      SELECT AnswerText as country, COUNT(*) as count
      FROM Answer
      WHERE QuestionID = 3
      GROUP BY AnswerText
      ORDER BY count DESC
      LIMIT 5
    `);
    console.table(topCountries);

    //вопрос ID 10
    console.log('\n=== Статистика ментального здоровья ===');
    const mentalHealthStats = await db.get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN AnswerText = 'Yes' THEN 1 ELSE 0 END) as with_condition,
        (SUM(CASE WHEN AnswerText = 'Yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as percentage
      FROM Answer
      WHERE QuestionID = 10
    `);
    console.table(mentalHealthStats);

    
    
    
    //вопрос ID 5
    const selfEmployed = await db.get(`
      SELECT 
        (SUM(CASE WHEN AnswerText = '1' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as percentage
      FROM Answer
      WHERE QuestionID = 5
    `);
    console.log('Процент самозанятых:', selfEmployed.percentage);
    
    //вопрос ID 118
    const remoteWork = await db.all(`
      SELECT AnswerText, COUNT(*) as count
      FROM Answer
      WHERE QuestionID = 118
      GROUP BY AnswerText
    `);
    console.log('Статистика удаленной работы:', remoteWork);

  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await db.close();
  }
}

main();