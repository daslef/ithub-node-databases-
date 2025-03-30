import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'mental_health.sqlite')
  },
  useNullAsDefault: true
});

async function main() {
  try {
    //Процент
    const healthPriority = await db.raw(`
      SELECT 
        (COUNT(CASE WHEN physical.AnswerText > mental.AnswerText THEN 1 END) * 100.0 / COUNT(*)) as percentage
      FROM Answer physical
      JOIN Answer mental ON physical.UserID = mental.UserID
      WHERE physical.QuestionID = 64  -- ID вопроса о физическом здоровье
        AND mental.QuestionID = 65    -- ID вопроса о ментальном здоровье
    `);
    
    console.log('\n=== Приоритет здоровья ===');
    console.table(healthPriority);

    //вопрос 103
    const comments = await db('Answer')
      .select('AnswerText')
      .where('QuestionID', 103);

    
    const words = comments
      .map(c => c.AnswerText?.toLowerCase().match(/\b\w{4,}\b/g) || [])
      .flat()
      .filter(word => word && !['this','that','with','your','have','would'].includes(word));

    const wordCount = {};
    words.forEach(word => wordCount[word] = (wordCount[word] || 0) + 1);
    
    const topWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    console.log('\n=== Топ-20 слов в комментариях ===');
    console.table(topWords.map(([word, count], i) => ({
      '#': i+1,
      Слово: word, 
      Количество: count
    })));

  } catch (error) {
    console.error('\n❌ Ошибка:', error);
  } finally {
    await db.destroy();
    console.log('\nСоединение закрыто');
  }
}

main();