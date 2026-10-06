import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorComponent from '../error';

describe('Error Component', () => {
  it('renders error message and handles reset click', () => {
    const mockReset = vi.fn();
    const mockError = new Error('Test Error Message');

    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText("We couldn't load the characters. Please try again later.")).toBeInTheDocument();

    const tryAgainBtn = screen.getByRole('button', { name: /Try again/i });
    expect(tryAgainBtn).toBeInTheDocument();

    fireEvent.click(tryAgainBtn);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
