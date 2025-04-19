import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // ✅ Tailwind styles

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);