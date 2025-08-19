import { useState, useEffect } from 'react';
import type { CountryRow } from '../data/loadData';
import { getCountryFlag } from '../data/randomRegions';

interface GuessVisualizationProps {
  guesses: CountryRow[];
  target: CountryRow;
}

interface MetricConfig {
  key: keyof CountryRow;
  label: string;
  formatter: (value: number, country: string) => string;
}

interface FlagPosition {
  country: string;
  position: number; // 0-100 percentage
  value: number;
  offsetY: number; // For anti-overlap
  offsetX: number; // For horizontal jitter
}

const METRICS: MetricConfig[] = [
  {
    key: 'GDP per Capita',
    label: '💰 GDP per Capita',
    formatter: (value: number, country: string) => {
      if (value < 1000) {
        return `${country}: $${(value / 1000).toFixed(1)}k`;
      }
      const thousands = Math.floor(value / 1000);
      return `${country}: $${thousands}k`;
    }
  },
  {
    key: 'Population',
    label: '👥 Population',
    formatter: (value: number, country: string) => {
      // Values are in thousands, so multiply by 1000 to get actual population
      const actualPop = value * 1000;
      if (actualPop >= 1000000000) {
        const billions = Math.floor(actualPop / 1000000000);
        return `${country}: ${billions} billion`;
      } else {
        const millions = Math.floor(actualPop / 1000000);
        return `${country}: ${millions}mil`;
      }
    }
  },
  {
    key: 'LDI',
    label: '🏛️ Liberal Democracy Index',
    formatter: (value: number, country: string) => {
      const truncated = Math.floor(value * 100) / 100;
      return `${country}: ${truncated.toFixed(2)}`;
    }
  }
];

export default function GuessVisualization({ guesses, target }: GuessVisualizationProps) {
  const [hoveredFlag, setHoveredFlag] = useState<{ country: string; metric: string } | null>(null);
  const [animatedGuesses, setAnimatedGuesses] = useState<CountryRow[]>([]);

  // Animate new guesses appearing
  useEffect(() => {
    if (guesses.length > animatedGuesses.length) {
      const timer = setTimeout(() => {
        setAnimatedGuesses([...guesses]);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedGuesses([...guesses]);
    }
  }, [guesses, animatedGuesses.length]);

  // Reset on new round
  useEffect(() => {
    if (guesses.length === 0) {
      setAnimatedGuesses([]);
    }
  }, [guesses.length]);

  const calculatePosition = (value: number, targetValue: number): number => {
    // Position flags relative to target country only
    // Target is always at center (50%)
    // Lower values go left, higher values go right
    
    if (value === targetValue) {
      return 50; // Exact match at center
    }
    
    // Calculate percentage difference from target
    const percentDiff = (value - targetValue) / targetValue;
    
    // Map percentage difference to position
    // Clamp to reasonable range to prevent flags from going off-screen
    const maxOffset = 40; // Maximum 40% offset from center
    const offset = Math.max(-maxOffset, Math.min(maxOffset, percentDiff * 50));
    
    return 50 + offset;
  };

  const calculateFlagPositions = (metric: MetricConfig): FlagPosition[] => {
    // For LDI, values can be between 0 and 1, so we need different filtering
    const isValidValue = (value: number) => {
      if (metric.key === 'LDI') {
        return value != null && !isNaN(value) && value >= 0;
      }
      return value != null && !isNaN(value) && value > 0;
    };
    
    const targetValue = target[metric.key] as number;
    
    const positions = animatedGuesses
      .filter(guess => {
        const value = guess[metric.key] as number;
        return isValidValue(value);
      })
      .map(guess => {
        const value = guess[metric.key] as number;
        const basePosition = calculatePosition(value, targetValue);
        return {
          country: guess.Country,
          position: basePosition,
          value: value,
          offsetY: 0,
          offsetX: 0
        };
      });

    // Smart positioning to prevent overlaps while maintaining left/right rules
    const adjustedPositions = [...positions];
    const flagWidth = 6; // Approximate width percentage of a flag
    const minPosition = 5; // Respect 5% boundary
    const maxPosition = 95; // Respect 95% boundary
    
    // Sort by original position to process from left to right
    adjustedPositions.sort((a, b) => a.position - b.position);
    
    // Apply overlap resolution iteratively
    for (let iteration = 0; iteration < 3; iteration++) {
      let hasOverlap = false;
      
      for (let i = 0; i < adjustedPositions.length; i++) {
        const currentFlag = adjustedPositions[i];
        
        // Check for overlaps with all other flags
        for (let j = 0; j < adjustedPositions.length; j++) {
          if (i === j) continue;
          
          const otherFlag = adjustedPositions[j];
          const distance = Math.abs(currentFlag.position - otherFlag.position);
          
          if (distance < flagWidth) {
            hasOverlap = true;
            
            // Determine movement direction based on value comparison with target
            const targetCenter = 50;
            const currentShouldBeLeft = currentFlag.value < targetValue;
            
            // Move flags to maintain proper left/right ordering
            if (currentFlag.value < otherFlag.value) {
              // Current should be to the left of other
              const newCurrentPos = Math.max(minPosition, otherFlag.position - flagWidth);
              if (newCurrentPos >= minPosition && (!currentShouldBeLeft || newCurrentPos < targetCenter)) {
                currentFlag.position = newCurrentPos;
              } else {
                // Move other flag right instead
                otherFlag.position = Math.min(maxPosition, currentFlag.position + flagWidth);
              }
            } else {
              // Current should be to the right of other
              const newCurrentPos = Math.min(maxPosition, otherFlag.position + flagWidth);
              if (newCurrentPos <= maxPosition && (currentShouldBeLeft || newCurrentPos > targetCenter)) {
                currentFlag.position = newCurrentPos;
              } else {
                // Move other flag left instead
                otherFlag.position = Math.max(minPosition, currentFlag.position - flagWidth);
              }
            }
            
            // Ensure positions stay within bounds
            currentFlag.position = Math.max(minPosition, Math.min(maxPosition, currentFlag.position));
            otherFlag.position = Math.max(minPosition, Math.min(maxPosition, otherFlag.position));
          }
        }
      }
      
      if (!hasOverlap) break;
    }

    return adjustedPositions;
  };

  const renderScale = (metric: MetricConfig, index: number) => {
    const flagPositions = calculateFlagPositions(metric);
    const isLastGuess = (country: string) => {
      return animatedGuesses.length > 0 && animatedGuesses[animatedGuesses.length - 1].Country === country;
    };

    // Target is always at center
    const targetPosition = 50;

    return (
      <div key={metric.key} className={index < METRICS.length - 1 ? "mb-6" : "mb-8"}>
        {/* Metric Title - Above scale */}
        <h4 className="text-sm font-semibold text-gray-800 text-center" style={{ margin: 20, padding: 0, lineHeight: 1 }}>{metric.label}</h4>
        
        {/* Scale Container with Image */}
        <div className="relative w-full min-w-0 overflow-visible" style={{ marginTop: -15, paddingTop: 0 }}>
          {/* Scale Image */}
          <div className="mx-auto" style={{ width: '400px', maxWidth: '100%', marginTop: 0, paddingTop: 0 }}>
            <img
              src={`${import.meta.env.BASE_URL}Scale.png`}
              alt="Scale"
              className="block w-full h-auto pointer-events-none select-none"
              style={{ width: '100%', height: 'auto', margin: 0, padding: 0, display: 'block' }}
            />
          </div>
          
          {/* Target Marker - Black tick at target position */}
          <div 
            className="absolute top-0 transform -translate-x-1/2 bg-black z-30"
            style={{
              left: `${targetPosition}%`,
              width: '2px',
              height: '35%'
            }}
          />

          {/* Flag Markers Layer - Positioned relative to the scale image */}
          <div className="absolute z-40" style={{ 
            left: '47%', 
            top: '70%', 
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxWidth: '100%',
            height: '100%'
          }}>
            {flagPositions.map((flagPos) => (
              <div
                key={`${flagPos.country}-${index}`}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  isLastGuess(flagPos.country) ? 'animate-bounce' : ''
                }`}
                style={{
                  left: `${flagPos.position}%`,
                  top: `50%`,
                  animationDuration: isLastGuess(flagPos.country) ? '0.6s' : '0s',
                  animationIterationCount: isLastGuess(flagPos.country) ? '2' : '0'
                }}
                onMouseEnter={() => setHoveredFlag({ country: flagPos.country, metric: metric.key })}
                onMouseLeave={() => setHoveredFlag(null)}
              >
                <div className="text-5xl cursor-pointer hover:scale-110 transition-transform">
                  {getCountryFlag(flagPos.country)}
                </div>
                
                {/* Tooltip */}
                {hoveredFlag?.country === flagPos.country && hoveredFlag?.metric === metric.key && (
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-40">
                    {metric.formatter(flagPos.value, flagPos.country)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 min-w-0 overflow-visible">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Your Guesses</h2>
      {animatedGuesses.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No guesses yet. Click on a country to make your first guess!</p>
      ) : (
        <div className="pb-16">
          {METRICS.map((metric, index) => renderScale(metric, index))}
        </div>
      )}
      <br />
    </div>
  );
}
