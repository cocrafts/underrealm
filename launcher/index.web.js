import { createRoot } from 'react-dom/client';

import { configure } from './launcher/utils/lib';
import App from './launcher';

const container = document.getElementById('root');
const root = createRoot(container);
configure();

root.render(<App />);
