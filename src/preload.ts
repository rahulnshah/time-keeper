import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    addGoal: (title: string, duration: string) => 
      ipcRenderer.invoke('add-goal', title, duration),
    
    getGoals: () => 
      ipcRenderer.invoke('get-goals'),
    
    markGoalAsCompleted: (id: number) => 
      ipcRenderer.invoke('mark-goal-completed', id),
    
    deleteCompletedGoals: () => 
      ipcRenderer.invoke('delete-completed-goals'),
  });

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
