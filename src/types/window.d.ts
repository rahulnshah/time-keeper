import { Goal  } from "src/model";
export interface GoalAPI {
    addGoal: (title: string, duration: string) => Promise<boolean>;
    getGoals: () => Promise<Goal[]>;
    markGoalAsCompleted: (id: number) => Promise<boolean>;
    deleteCompletedGoals: () => Promise<boolean>;
}

declare global {
  interface Window {
    api: GoalAPI;
  }
}
