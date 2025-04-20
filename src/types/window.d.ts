import { Goal  } from "src/model";
export interface GoalAPI {
    addGoal: (title: string, duration: string) => Promise<Goal>;
    getGoals: () => Promise<Goal[]>;
    markGoalAsCompleted: (id: number) => Promise<boolean>;
    deleteCompletedGoals: () => Promise<boolean>;
    updateGoalCompletion: (id: number, completed: boolean) => Promise<boolean>;
    deleteGoal: (id: number) => Promise<boolean>;
}

declare global {
  interface Window {
    api: GoalAPI;
  }
}
