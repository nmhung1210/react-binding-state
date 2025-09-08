import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

global.requestAnimationFrame = callback => {
  return setTimeout(() => callback(0), 0);
};

global.cancelAnimationFrame = id => {
  clearTimeout(id);
};

vi.mock('react-syntax-highlighter', () => ({
    Prism: () => null
}));
