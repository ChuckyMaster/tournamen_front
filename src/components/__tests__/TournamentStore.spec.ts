import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTournamentStore } from '@/stores/tournamentStore';
import axios from 'axios';

// Mock Axios
vi.mock('axios');

describe('Tournament Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Pinia
  });

  it('fetchTournaments met à jour la liste des tournois', async () => {
    // Données simulées
    const mockTournaments = [{ id: 1, name: 'Tournoi 1' }, { id: 2, name: 'Tournoi 2' }];
    axios.get.mockResolvedValue({ data: mockTournaments });

    const store = useTournamentStore();
    expect(store.tournaments).toEqual([]);

    await store.fetchTournaments();

    expect(store.tournaments).toEqual(mockTournaments);
  });
});
