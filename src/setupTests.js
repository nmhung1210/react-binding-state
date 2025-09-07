import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

global.requestAnimationFrame = (cb) => {
  return cb();
};

global.cancelAnimationFrame = () => {};

vi.mock('react-syntax-highlighter', () => ({
    Prism: () => null
}));
