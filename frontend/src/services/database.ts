import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('UserProgressionDB');

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS UserProgression (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quizId INTEGER,
        questionId INTEGER,
        selectedOption TEXT,
        isCorrect INTEGER
      );`,
      [],
      () => {
        console.log('UserProgression table created');
      },
      error => {
        console.log('Error creating UserProgression table: ', error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ExamResults (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        examId INTEGER,
        score INTEGER,
        status TEXT
      );`,
      [],
      () => {
        console.log('ExamResults table created');
      },
      error => {
        console.log('Error creating ExamResults table: ', error);
      }
    );
  });
};

export const saveUserProgression = (quizId, questionId, selectedOption, isCorrect) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO UserProgression (quizId, questionId, selectedOption, isCorrect) VALUES (?, ?, ?, ?);`,
      [quizId, questionId, selectedOption, isCorrect],
      () => {
        console.log('User progression saved successfully');
      },
      error => {
        console.log('Error saving user progression: ', error);
      }
    );
  });
};

export const saveExamResult = (examId, score, status) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO ExamResults (examId, score, status) VALUES (?, ?, ?);`,
      [examId, score, status],
      () => {
        console.log('Exam result saved successfully');
      },
      error => {
        console.log('Error saving exam result: ', error);
      }
    );
  });
};

export const getUserProgression = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM UserProgression`,
      [],
      (tx, results) => {
        let len = results.rows.length;
        if (len > 0) {
          let userProgression = [];
          for (let i = 0; i < len; i++) {
            userProgression.push(results.rows.item(i));
          }
          callback(userProgression);
        } else {
          callback([]);
        }
      },
      error => {
        console.log('Error fetching user progression: ', error);
      }
    );
  });
};

export const getExamResults = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM ExamResults`,
      [],
      (tx, results) => {
        let len = results.rows.length;
        if (len > 0) {
          let examResults = [];
          for (let i = 0; i < len; i++) {
            examResults.push(results.rows.item(i));
          }
          callback(examResults);
        } else {
          callback([]);
        }
      },
      error => {
        console.log('Error fetching exam results: ', error);
      }
    );
  });
};