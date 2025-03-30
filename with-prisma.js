import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'mental_health.sqlite');

const prisma = new PrismaClient({
  datasources: { db: { url: `file:${dbPath}` } }
});

function formatNumber(num) {
  return Number(num.toString().replace('n', ''));
}

async function main() {
  try {
    console.log('=== Анализ данных опроса ===');

    //Ментальное здоровье по типу работы
    const mentalHealthStats = await prisma.$queryRaw`
      SELECT 
        remote.AnswerText as work_type,
        COUNT(*) as total,
        SUM(CASE WHEN mental.AnswerText = 'Yes' THEN 1 ELSE 0 END) as cases,
        ROUND(
          SUM(CASE WHEN mental.AnswerText = 'Yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 
          2
        ) as percentage
      FROM Answer mental
      JOIN Answer remote ON mental.UserID = remote.UserID
      WHERE mental.QuestionID = 33
        AND remote.QuestionID = 118
      GROUP BY remote.AnswerText
    `;
    
    console.log('\n=== Ментальное здоровье по типу работы ===');
    mentalHealthStats.forEach(row => {
      console.log(
        `${row.work_type.padEnd(10)}: ${formatNumber(row.percentage)}% ` +
        `(${formatNumber(row.cases)} из ${formatNumber(row.total)})`
      );
    });

    //Самозанятые до 18 лет
    const youngFreelancers = await prisma.$queryRaw`
      SELECT 
        ROUND(
          (
            SELECT COUNT(*) 
            FROM Answer a1
            JOIN Answer a2 ON a1.UserID = a2.UserID
            WHERE a1.QuestionID = 1
              AND CAST(a1.AnswerText AS INTEGER) < 18
              AND a2.QuestionID = 5
              AND a2.AnswerText = '1'
          ) * 100.0 / 
          (
            SELECT COUNT(*) 
            FROM Answer 
            WHERE QuestionID = 1 
              AND CAST(AnswerText AS INTEGER) < 18
          ),
          2
        ) as percentage
    `;
    
    const percentage = formatNumber(youngFreelancers[0].percentage);
    console.log('\n=== Самозанятые до 18 лет ===');
    console.log(`Доля самозанятых среди несовершеннолетних: ${percentage}%`);

  } catch (error) {
    console.error('\n❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
    console.log('\nАнализ завершен');
  }
}

main();