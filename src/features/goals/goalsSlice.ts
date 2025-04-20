import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Goal } from '../../model';

interface GoalsState {
  goals: Goal[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: GoalsState = {
  goals: [],
  status: 'idle',
  error: null,
};

// Async thunks for interacting with window.api
export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  return await window.api.getGoals();
});

export const addGoal = createAsyncThunk(
  'goals/addGoal',
  async ({ aTitle, aDuration }: { aTitle: string; aDuration: string }) => {
    const { id, title, duration, completed } = await window.api.addGoal(aTitle, aDuration);
    return { id, title, duration, completed };
  }
);

export const updateGoalCompletion = createAsyncThunk(
  'goals/updateGoalCompletion',
  async ({ id, completed }: { id: number; completed: boolean }) => {
    await window.api.updateGoalCompletion(id, completed);
    return { id, completed };
  }
);

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id: number) => {
  await window.api.deleteGoal(id);
  return id;
});

// Goals slice
const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch goals';
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(updateGoalCompletion.fulfilled, (state, action) => {
        const goal = state.goals.find((g) => g.id === action.payload.id);
        if (goal) {
          goal.completed = action.payload.completed;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((goal) => goal.id !== action.payload);
      });
  },
});

export default goalsSlice.reducer;