import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  it('renders page information correctly', () => {
    render(<Pagination currentPage={2} totalPages={10} />);
    expect(screen.getByText('Page 2 of 10')).toBeInTheDocument();
  });

  it('renders active links when prev and next pages exist', () => {
    render(<Pagination currentPage={2} totalPages={10} />);

    const prevLink = screen.getByRole('link', { name: /Previous/i });
    expect(prevLink).toHaveAttribute('href', '/?page=1');

    const nextLink = screen.getByRole('link', { name: /Next/i });
    expect(nextLink).toHaveAttribute('href', '/?page=3');
  });

  it('disables previous button on page 1', () => {
    render(<Pagination currentPage={1} totalPages={10} />);

    const prevSpan = screen.getByText(/Previous/i);
    expect(prevSpan.tagName).toBe('SPAN');
    expect(prevSpan).toHaveClass('cursor-not-allowed');

    const nextLink = screen.getByRole('link', { name: /Next/i });
    expect(nextLink).toHaveAttribute('href', '/?page=2');
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} />);

    const nextSpan = screen.getByText(/Next/i);
    expect(nextSpan.tagName).toBe('SPAN');
    expect(nextSpan).toHaveClass('cursor-not-allowed');

    const prevLink = screen.getByRole('link', { name: /Previous/i });
    expect(prevLink).toHaveAttribute('href', '/?page=9');
  });
});
