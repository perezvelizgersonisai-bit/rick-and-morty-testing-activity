import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../page';
import * as api from '@/lib/api';

vi.mock('@/lib/api', () => ({
  getCharacters: vi.fn(),
}));

describe('Home Page', () => {
  it('renders character list and pagination', async () => {
    const mockData = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth', url: '' },
          location: { name: 'Earth', url: '' },
          image: 'https://...',
          episode: [],
          url: '',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    };

    (api.getCharacters as any).mockResolvedValueOnce(mockData);

    const searchParams = Promise.resolve({ page: '1' });
    const jsx = await Home({ searchParams });
    render(jsx);

    expect(screen.getByText('Rick and Morty Characters')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('defaults to page 1 when searchParams page is not provided', async () => {
    const mockData = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [],
    };

    (api.getCharacters as any).mockResolvedValueOnce(mockData);

    const searchParams = Promise.resolve({});
    const jsx = await Home({ searchParams });
    render(jsx);

    expect(api.getCharacters).toHaveBeenCalledWith(1);
  });
});
