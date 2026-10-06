import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CharacterPage from '../page';
import * as api from '@/lib/api';

vi.mock('@/lib/api', () => ({
  getCharacter: vi.fn(),
  getEpisodes: vi.fn(),
}));

describe('Character Detail Page', () => {
  it('renders character details and episode list', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: 'Super Scientist',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://...',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: '',
      created: '2017-11-04T18:48:46.250Z',
    };

    const mockEpisodes = [
      { id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01' },
    ];

    (api.getCharacter as any).mockResolvedValueOnce(mockCharacter);
    (api.getEpisodes as any).mockResolvedValueOnce(mockEpisodes);

    const params = Promise.resolve({ id: '1' });
    const jsx = await CharacterPage({ params });
    render(jsx);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Super Scientist')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('S01E01')).toBeInTheDocument();
  });
});
