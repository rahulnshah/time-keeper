import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, addGoal, updateGoalCompletion, deleteGoal } from './features/goals/goalsSlice';
import { RootState, AppDispatch } from './app/store'
export default function GoalsView() {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, status, error } = useSelector((state : RootState) => state.goals);

  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('5');

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleAddGoal = () => {
    if (!title || !hours || !minutes) {
      alert('Please fill out all fields.');
      return;
    }

    const hoursNum = parseInt(hours, 10);
    const minutesNum = parseInt(minutes, 10);

    if (
      isNaN(hoursNum) ||
      isNaN(minutesNum) ||
      hoursNum < 0 ||
      hoursNum > 24 ||
      minutesNum < 0 ||
      minutesNum >= 60
    ) {
      alert('Please enter valid hours (0-24) and minutes (0-59).');
      return;
    }

    const totalMinutes = hoursNum * 60 + minutesNum;
    if (totalMinutes < 5 || totalMinutes > 1440) {
      alert('Duration must be between 5 minutes and 24 hours.');
      return;
    }

    const duration = `${hoursNum.toString().padStart(2, '0')}:${minutesNum.toString().padStart(2, '0')}`;
    const goal = {aTitle: title, aDuration: duration};
    dispatch(addGoal(goal));
    setTitle('');
    setHours('0');
    setMinutes('5');
  };

  const handleMarkAsCompleted = (id: number, currentStatus: boolean) => {
    dispatch(updateGoalCompletion({ id, completed: !currentStatus }));
  };

  const handleDeleteGoal = (id: number) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      dispatch(deleteGoal(id));
    }
  };

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
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="text-black px-4 py-2 rounded shadow border border-gray-300 w-20"
            min="0"
            max="24"
          />
          <span>:</span>
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="text-black px-4 py-2 rounded shadow border border-gray-300 w-20"
            min="0"
            max="59"
          />
        </div>
        <button
          onClick={handleAddGoal}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded shadow mt-2"
        >
          Add Goal
        </button>
      </div>
      <ul className="w-full max-w-md">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {goals.map((goal) => (
          <li
            key={goal.id}
            className={`flex justify-between items-center p-4 mb-2 rounded shadow ${
              goal.completed ? 'bg-gray-300 opacity-50' : 'bg-gray-100'
            }`}
          >
            <div>
              <h2 className="font-bold">{goal.title}</h2>
              <p>{goal.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => handleMarkAsCompleted(goal.id, goal.completed)}
              />
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="px-2 py-1 bg-red-500 text-white rounded shadow"
                disabled={goal.completed}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

