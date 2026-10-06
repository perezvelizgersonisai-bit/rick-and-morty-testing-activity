import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacters, getCharacter, getEpisodes } from '../api';

global.fetch = vi.fn();

describe('API Utils', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getCharacters', () => {
    it('fetches characters successfully for a given page', async () => {
      const mockResponse = {
        info: { count: 826, pages: 42, next: 'url', prev: null },
        results: [{ id: 1, name: 'Rick Sanchez' }],
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await getCharacters(1);
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?page=1');
      expect(data).toEqual(mockResponse);
    });

    it('throws error when fetch fails', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getCharacters(1)).rejects.toThrow('Failed to fetch characters');
    });
  });

  describe('getCharacter', () => {
    it('fetches character detail successfully by id', async () => {
      const mockCharacter = { id: 1, name: 'Rick Sanchez' };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
      });

      const data = await getCharacter('1');
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
      expect(data).toEqual(mockCharacter);
    });

    it('throws error when character detail fetch fails', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getCharacter('9999')).rejects.toThrow('Failed to fetch character details');
    });
  });

  describe('getEpisodes', () => {
    it('returns empty array when ids array is empty', async () => {
      const result = await getEpisodes([]);
      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches multiple episodes successfully', async () => {
      const mockEpisodes = [
        { id: 1, name: 'Pilot' },
        { id: 2, name: 'Lawnmower Dog' },
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEpisodes,
      });

      const data = await getEpisodes(['1', '2']);
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/1,2');
      expect(data).toEqual(mockEpisodes);
    });

    it('wraps single episode object in an array', async () => {
      const mockSingleEpisode = { id: 1, name: 'Pilot' };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSingleEpisode,
      });

      const data = await getEpisodes(['1']);
      expect(data).toEqual([mockSingleEpisode]);
    });

    it('throws error when episodes fetch fails', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getEpisodes(['1'])).rejects.toThrow('Failed to fetch episodes');
    });
  });
});
