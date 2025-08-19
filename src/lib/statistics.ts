export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  winPercentage: number;
}

const STATS_KEY = 'politicle-stats';

export function getGameStats(): GameStats {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      const stats = JSON.parse(stored);
      return {
        ...stats,
        winPercentage: stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0
      };
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
  
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winPercentage: 0
  };
}

export function updateGameStats(won: boolean): GameStats {
  const stats = getGameStats();
  
  stats.gamesPlayed += 1;
  
  if (won) {
    stats.gamesWon += 1;
    stats.currentStreak += 1;
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
  } else {
    stats.currentStreak = 0;
  }
  
  stats.winPercentage = Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
  
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats:', error);
  }
  
  return stats;
}
