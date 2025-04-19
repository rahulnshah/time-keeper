import { useEffect, useState } from 'react';
import { Goal } from './model';

export default function GoalsView() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState<string>('');
  const [duration, setDuration] = useState<string>('00:05');

  const fetchGoals = async (): Promise<void> => {
    const goals: Goal[] = await window.api.getGoals();
    setGoals(goals);
  };

  const handleAddGoal = (): void => {
    if (!title || !duration) {
      alert('Please fill out all fields.');
      return;
    }
    const [hours, minutes] = duration.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes < 5 || totalMinutes > 1440) {
      alert('Duration must be between 5 minutes and 24 hours.');
      return;
    }
    window.api.addGoal(title, duration);
    setTitle('');
    setDuration('00:05');
    fetchGoals();
  };

  const handleMarkAsCompleted = (id: number): void => {
    window.api.markGoalAsCompleted(id);
    fetchGoals();
  };

  useEffect((): (() => void) => {
    fetchGoals();
    return (): void => {
      window.api.deleteCompletedGoals();
    };
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <h1 className="text-2xl font-bold mb-4">Daily Goals</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black px-4 py-2 rounded shadow border border-gray-300 mr-2"
        />
        <input
          type="time"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="text-black px-4 py-2 rounded shadow border border-gray-300"
        />
        <button
          onClick={handleAddGoal}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Add Goal
        </button>
      </div>
      <ul className="w-full max-w-md">
        {goals.map((goal) => (
          <li
            key={goal.id}
            className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded shadow"
          >
            <div>
              <h2 className="font-bold">{goal.title}</h2>
              <p>{goal.duration}</p>
            </div>
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => handleMarkAsCompleted(goal.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

