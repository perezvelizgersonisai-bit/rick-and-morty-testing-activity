import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CharacterCard from '../CharacterCard';
import { Character } from '@/types/rickandmorty';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://...' },
  location: { name: 'Citadel of Ricks', url: 'https://...' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://...',
  created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterCard Component', () => {
  it('renders character details correctly', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();

    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toHaveAttribute('src', mockCharacter.image);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/character/1');
  });

  it('renders green status dot for Alive status', () => {
    const { container } = render(<CharacterCard character={mockCharacter} />);
    const dot = container.querySelector('.bg-green-500');
    expect(dot).toBeInTheDocument();
  });

  it('renders red status dot for Dead status', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' as const };
    const { container } = render(<CharacterCard character={deadCharacter} />);
    const dot = container.querySelector('.bg-red-500');
    expect(dot).toBeInTheDocument();
  });

  it('renders gray status dot for unknown status', () => {
    const unknownCharacter = { ...mockCharacter, status: 'unknown' as const };
    const { container } = render(<CharacterCard character={unknownCharacter} />);
    const dot = container.querySelector('.bg-gray-500');
    expect(dot).toBeInTheDocument();
  });

  it('renders fallback gray status dot for custom status', () => {
    const customCharacter = { ...mockCharacter, status: 'OtherStatus' as any };
    const { container } = render(<CharacterCard character={customCharacter} />);
    const dot = container.querySelector('.bg-gray-500');
    expect(dot).toBeInTheDocument();
  });
});
