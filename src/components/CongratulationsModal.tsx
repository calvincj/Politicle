import { getCountryFlag } from '../data/randomRegions';
import type { GameStats } from '../lib/statistics';
import type { CountryRow } from '../data/loadData';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewRound: () => void;
  targetCountry: CountryRow;
  stats: GameStats;
  guessCount: number;
  maxGuesses: number;
  onPlayClickSound?: () => void;
}

export default function CongratulationsModal({ 
  isOpen, 
  onClose, 
  onNewRound, 
  targetCountry, 
  stats, 
  guessCount,
  maxGuesses,
  onPlayClickSound
}: CongratulationsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 w-full h-full z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50"></div>
      
      {/* Modal content */}
      <div className="relative w-full max-w-lg h-auto max-h-[80vh] overflow-y-auto flex flex-col bg-white rounded-lg shadow-xl border-2 border-gray-300 m-4">
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Congratulations! 🎉</h2>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            {/* Success message */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                You found the target country!
              </h3>
              <div className="text-lg text-gray-700 mb-2">
                {getCountryFlag(targetCountry.Country)} <span className="font-semibold">{targetCountry.Country}</span>
              </div>
              <p className="text-gray-600">
                Solved in {guessCount}/{maxGuesses} guesses
              </p>
            </div>

            {/* Statistics */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.gamesPlayed}</div>
                  <div className="text-sm text-gray-600">Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.winPercentage}%</div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Current Streak</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onPlayClickSound?.();
                  onClose();
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                View Round
              </button>
              <button
                onClick={() => {
                  onPlayClickSound?.();
                  onClose();
                  onNewRound();
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                New Round
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
