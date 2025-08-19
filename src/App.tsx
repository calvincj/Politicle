import { useState, useEffect } from 'react';
import { loadCountryData } from './data/loadData';
import type { CountryRow } from './data/loadData';
import { generateRandomVisibleRegion, pickRandomTargetFromVisibleRegion, getGovernmentTypeAbbreviation } from './data/randomRegions';
import type { VisibleRegion } from './data/randomRegions';
import { updateGameStats, getGameStats } from './lib/statistics';
import type { GameStats } from './lib/statistics';
import GeoChartMap from './components/GeoChartMap';
import GuessVisualization from './components/GuessVisualization';
import CongratulationsModal from './components/CongratulationsModal';
import GameOverModal from './components/GameOverModal';
import HowToPlayModal from './components/HowToPlayModal';
import './App.css';

function App() {
  const [countryData, setCountryData] = useState<CountryRow[]>([]);
  const [currentVisibleRegion, setCurrentVisibleRegion] = useState<VisibleRegion | null>(null);
  const [target, setTarget] = useState<CountryRow | null>(null);
  const [guesses, setGuesses] = useState<CountryRow[]>([]);
  const [govRevealed, setGovRevealed] = useState<boolean>(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [maxGuesses, setMaxGuesses] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);
  const [gameStats, setGameStats] = useState<GameStats>(getGameStats());
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await loadCountryData();
      // Convert the grouped data back to a flat array
      const flatData: CountryRow[] = [];
      Object.values(data).forEach(countries => {
        flatData.push(...countries);
      });
      setCountryData(flatData);
      setLoading(false);
      
      // Start first round automatically
      startNewRound(flatData);
    };
    loadData();
  }, []);

  // Start new round with random visible region
  const startNewRound = (data?: CountryRow[]) => {
    const dataToUse = data || countryData;
    if (dataToUse.length === 0) return;

    const visibleRegion = generateRandomVisibleRegion(dataToUse);
    const newTarget = pickRandomTargetFromVisibleRegion(visibleRegion, dataToUse);
    
    if (!newTarget) {
      console.error('No target found for visible region:', visibleRegion.name);
      return;
    }

    setCurrentVisibleRegion(visibleRegion);
    setTarget(newTarget);
    setGuesses([]);
    setMaxGuesses(visibleRegion.maxGuesses);
    setGovRevealed(false);
    setResult(null);
    setShowCongratulationsModal(false);
    setShowGameOverModal(false);
  };


  // Handle country guess
  const handleCountryGuess = (countryName: string) => {
    if (result !== null || !target) return;

    const country = countryData.find(c => c.Country === countryName);
    if (!country) return;

    const newGuesses = [...guesses, country];

    // Check if correct
    if (country.Country === target.Country) {
      console.log('WIN! Correct guess:', country.Country);
      setGuesses(newGuesses);
      const updatedStats = updateGameStats(true);
      setGameStats(updatedStats);
      setResult('win');
      setShowCongratulationsModal(true);
      return;
    }

    // Check if out of guesses
    if (newGuesses.length >= maxGuesses) {
      setGuesses(newGuesses);
      console.log('LOSE! Out of attempts. Target was:', target.Country);
      const updatedStats = updateGameStats(false);
      setGameStats(updatedStats);
      setResult('lose');
      setShowGameOverModal(true);
      return;
    }

    // Continue game
    setGuesses(newGuesses);
  };

  // Get guessed country names
  const guessedCountries = guesses.map(g => g.Country);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Politicle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🌍 Politicle!</h1>
          <div className="flex justify-center gap-3 mb-8">
            {!showHowToPlayModal && !showCongratulationsModal && !showGameOverModal && (
              <>
                <button
                  onClick={() => setShowHowToPlayModal(true)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  How to Play
                </button>
                <button
                  onClick={() => setGovRevealed(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  disabled={!target || govRevealed}
                >
                  {govRevealed ? getGovernmentTypeAbbreviation(target?.Government || '') : 'Hint'}
                </button>
              </>
            )}
          </div>
        </div>

        {currentVisibleRegion && target && (
          <div className="relative isolate grid grid-cols-1 grid-rows-1 min-w-0 max-w-4xl mx-auto">
            {/* Game Content - Always rendered, in grid cell [1,1] */}
            <div className={`col-start-1 row-start-1 min-w-0 ${
              (showCongratulationsModal || showGameOverModal || showHowToPlayModal) ? 'opacity-0 pointer-events-none' : ''
            }`}>
              {/* Game Controls */}
              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Guessed: <span className="font-semibold text-blue-600">{guesses.length}/{maxGuesses}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <div></div> {/* Empty spacer */}
                  <div></div> {/* Empty spacer - hint moved to header */}
                  <button
                    onClick={() => startNewRound()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors min-h-[40px]"
                  >
                    New Round
                  </button>
                </div>
              </div>

              {/* Google GeoChart Map */}
              <div className="mb-8">
                <GeoChartMap
                  visibleRegion={currentVisibleRegion}
                  onCountryClick={handleCountryGuess}
                  guessedCountries={guessedCountries}
                />
              </div>

              {/* Your Guesses */}
              <div className="mb-6">
                <GuessVisualization
                  guesses={guesses}
                  target={target}
                />
              </div>
            </div>

            {/* Congratulations Modal - Stacked in same grid cell [1,1] */}
            <div 
              className={`col-start-1 row-start-1 relative ${
                showCongratulationsModal ? 'block' : 'hidden'
              }`}
            >
              <CongratulationsModal
                isOpen={showCongratulationsModal && !!target}
                onClose={() => setShowCongratulationsModal(false)}
                onNewRound={startNewRound}
                targetCountry={target!}
                stats={gameStats}
                guessCount={guesses.length}
                maxGuesses={maxGuesses}
              />
            </div>

            {/* Game Over Modal - Stacked in same grid cell [1,1] */}
            <div 
              className={`col-start-1 row-start-1 relative ${
                showGameOverModal ? 'block' : 'hidden'
              }`}
            >
              <GameOverModal
                isOpen={showGameOverModal && !!target}
                onClose={() => setShowGameOverModal(false)}
                onNewRound={startNewRound}
                targetCountry={target!}
                stats={gameStats}
                maxGuesses={maxGuesses}
              />
            </div>

            {/* How to Play Modal - Stacked in same grid cell [1,1] */}
            <div 
              className={`col-start-1 row-start-1 relative ${
                showHowToPlayModal ? 'block' : 'hidden'
              }`}
            >
              <HowToPlayModal
                isOpen={showHowToPlayModal}
                onClose={() => setShowHowToPlayModal(false)}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
