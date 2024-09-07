import { createRoot } from 'react-dom/client';

import { configure } from './utils/lib';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
configure();

root.render(<App />);
