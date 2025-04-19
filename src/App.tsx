import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import GoalsView from './GoalsView';
import TimeView from './TimeView';

export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col items-center justify-start bg-white text-black px-4 pt-8">
        {/* Nav bar for "tabs" */}
        <nav className="mb-6 flex gap-4">
          <Link to="/goals" className="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200">Goals</Link>
          <Link to="/time" className="px-4 py-2 rounded bg-green-100 hover:bg-green-200">Time Left</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/goals" />} />
          <Route path="/goals" element={<GoalsView />} />
          <Route path="/time" element={<TimeView />} />
        </Routes>
      </div>
    </Router>
  );
}