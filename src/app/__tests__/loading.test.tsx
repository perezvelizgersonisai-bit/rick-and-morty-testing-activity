import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../loading';

describe('Loading Component', () => {
  it('renders skeleton cards with pulse animation', () => {
    const { container } = render(<Loading />);
    const pulseElements = container.querySelectorAll('.animate-pulse');
    expect(pulseElements.length).toBeGreaterThan(0);
  });
});
