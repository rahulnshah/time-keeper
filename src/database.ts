import Database from 'better-sqlite3';
import { Goal } from './model';

const db = new Database('goals.db');

// Initialize the goals table
db.exec(`
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

export const addGoal = (title: string, duration: string): Goal => {
  const stmt = db.prepare('INSERT INTO goals (title, duration) VALUES (?, ?)');
  const info = stmt.run(title, duration);

  // Fetch the last inserted goal using the lastInsertRowid
  const getStmt = db.prepare('SELECT * FROM goals WHERE id = ?');
  return getStmt.get(info.lastInsertRowid) as Goal;
};

export const getGoals = (): Goal[] => {
  const stmt = db.prepare('SELECT * FROM goals');
  return stmt.all() as Goal[];
};

export const markGoalAsCompleted = (id: number): void => {
  const stmt = db.prepare('UPDATE goals SET completed = 1 WHERE id = ?');
  stmt.run(id);
};

export const deleteCompletedGoals = (): void => {
  const stmt = db.prepare('DELETE FROM goals WHERE completed = 1');
  stmt.run();
};

export const deleteGoal = (id: number): void => {
  const stmt = db.prepare('DELETE FROM goals WHERE id = ?');
  stmt.run(id);
};

// New function to toggle goal completion
export const updateGoalCompletion = (id: number, completed: boolean): void => {
  const stmt = db.prepare('UPDATE goals SET completed = ? WHERE id = ?');
  stmt.run(completed ? 1 : 0, id);
};